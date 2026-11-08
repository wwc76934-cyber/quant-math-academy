<#
  One-shot book pipeline: fragments -> validation -> assembly -> DOCX -> two-pass PDF.

  The PDF needs two passes because Chrome cannot resolve target-counter(): pass 1 prints
  without TOC page numbers, resolve_toc.py reads the real page of every heading back out of
  that PDF, and pass 2 rebuilds the HTML with those numbers baked in and prints the final file.
#>
$ErrorActionPreference = 'Continue'
$root = 'C:\Users\18137\Documents\deepseek-harness\default-workspace'
Set-Location $root

$node = 'D:\deepseek-harness\data\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe'
$py = 'D:\deepseek-harness\data\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe'
$pandoc = Join-Path $root 'build\pandoc.exe'
$env:PYTHONIOENCODING = 'utf-8'
$pyPackages = Join-Path $root '.python-packages'

$finalMd = Join-Path $root 'build\量化数学进阶教材.md'
$feedMd = Join-Path $root 'build\量化数学进阶教材.pandoc.md'
$rawDocx = Join-Path $root 'build\量化数学进阶教材-raw.docx'
$finalDocx = Join-Path $root 'build\量化数学进阶教材.docx'
$html = Join-Path $root 'build\量化数学进阶教材.html'
$pass1 = Join-Path $root 'build\pass1.pdf'
$finalPdf = Join-Path $root 'build\量化数学进阶教材.pdf'
$tocItems = Join-Path $root 'build\toc-items.json'
$tocMap = Join-Path $root 'build\toc-map.json'

function Stage($n, $name) { Write-Host "`n===== [$n] $name =====" }

Stage 1 'fold chapter fragments'
& $node scripts\merge-parts.mjs

Stage 2 'repair control characters'
& $node scripts\fix-control-chars.mjs

Stage 2.5 'normalize solution exercise headings'
& $node scripts\normalize-solution-headings.mjs

Stage 3 'validate structure (advisory)'
& $node scripts\validate.mjs --allow-partial

Stage 4 'lint every formula through KaTeX (blocking)'
& $node scripts\lint-math.mjs
if ($LASTEXITCODE -ne 0) { Write-Host 'ABORT: math lint reported problems'; exit 1 }

Stage 4.5 'audit numbered cross-references (blocking on broken targets)'
& $node scripts\check-references.mjs
if ($LASTEXITCODE -ne 0) { Write-Host 'ABORT: cross-reference audit reported problems'; exit 1 }

Stage 5 'remove stale artifacts and assemble the manuscript'
foreach ($f in @($finalMd, $feedMd, $rawDocx, $finalDocx, $html, $pass1, $finalPdf)) {
  if (Test-Path $f) { Remove-Item $f -Force }
}
& $node scripts\assemble.mjs
if (-not (Test-Path $finalMd)) { Write-Host 'ABORT: assembly produced no manuscript'; exit 1 }
$chars = (Get-Content $finalMd -Raw).Length
Write-Host "assembled manuscript: $chars characters"

Stage 6 'pandoc -> DOCX (secondary deliverable)'
$refArg = '--reference-doc=' + (Join-Path $root 'assets\reference.docx')
$pandocArgs = @(
  $feedMd, '-f', 'markdown+tex_math_dollars+raw_tex', '-t', 'docx',
  $refArg, '--toc', '--toc-depth=3', '-o', $rawDocx
)
& $pandoc @pandocArgs
if (Test-Path $rawDocx) {
  & $py scripts\postprocess_docx.py $rawDocx $finalDocx $pyPackages
  if (Test-Path $finalDocx) { Write-Host "DOCX ok: $((Get-Item $finalDocx).Length) bytes" }
} else { Write-Host 'WARN: pandoc produced no DOCX (non-fatal)' }

Stage 7 'build HTML with KaTeX'
& $node scripts\build.mjs --allow-partial

Stage 8 'pass 1: print with no TOC page numbers'
& $node scripts\print-split.mjs --input $html --output $pass1
if (-not (Test-Path $pass1)) { Write-Host 'ABORT: pass 1 produced no PDF'; exit 1 }
& $py scripts\resolve_toc.py $pass1 $tocItems (Join-Path $root 'build\toc-map-1.json')

# Three passes are required, not two. Pass 1 has no page numbers, so its TOC is shorter than
# the final one; numbering it lengthens the TOC and shifts every later page. Pass 2 is printed
# with numbers in place, so the pages resolved out of pass 2 are correct for a numbered TOC.
# Pass 3 rebuilds from that map and prints the deliverable.
Stage 9 'pass 2: print with provisional numbers, then resolve the true ones'
& $node scripts\build.mjs --allow-partial --toc-map (Join-Path $root 'build\toc-map-1.json')
$pass2 = Join-Path $root 'build\pass2.pdf'
if (Test-Path $pass2) { Remove-Item $pass2 -Force }
& $node scripts\print-split.mjs --input $html --output $pass2
& $py scripts\resolve_toc.py $pass2 $tocItems $tocMap

Stage 10 'pass 3: rebuild with resolved numbers and print the final PDF'
& $node scripts\build.mjs --allow-partial --toc-map $tocMap
& $node scripts\print-split.mjs --input $html --output $finalPdf

Stage 11 'verify the final PDF against its own TOC'
$tocMap2 = Join-Path $root 'build\toc-map-verify.json'
& $py scripts\resolve_toc.py $finalPdf $tocItems $tocMap2
& $py -c @"
import json
a = json.load(open(r'$tocMap', encoding='utf-8'))
b = json.load(open(r'$tocMap2', encoding='utf-8'))
common = [k for k in a if k in b]
drift = {k: (a[k], b[k]) for k in common if a[k] != b[k]}
print(json.dumps({'compared': len(common), 'driftedEntries': len(drift),
                  'sampleDrift': dict(list(drift.items())[:8])}, ensure_ascii=False, indent=1))
"@

Write-Host "`n===== artifacts ====="
foreach ($f in @($finalMd, $finalDocx, $finalPdf)) {
  if (Test-Path $f) { Write-Host ("{0}  {1:N0} bytes" -f $f, (Get-Item $f).Length) }
}
