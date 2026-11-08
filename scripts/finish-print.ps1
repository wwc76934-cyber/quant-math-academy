# Finish the book after the split-print machinery: reuse the already merged pass-1 PDF,
# stamp the page-number overlay, then run the two TOC passes and produce the final PDF.
$ErrorActionPreference = 'Continue'
$root = 'C:\Users\18137\Documents\deepseek-harness\default-workspace'
Set-Location $root
$node = 'D:\deepseek-harness\data\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe'
$py = 'D:\deepseek-harness\data\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe'
$env:PYTHONIOENCODING = 'utf-8'
$env:PYTHONPATH = Join-Path $root '.python-packages'

$pass1 = Join-Path $root 'build\pass1.pdf'
$pass2 = Join-Path $root 'build\pass2.pdf'
$final = Join-Path $root 'build\量化数学进阶教材.pdf'

if (-not (Test-Path $pass1)) {
  Write-Host 'stamp numbers on merged pass-1 (reuse _merged.pdf) ...'
  $env:OVERLAY_SKIP = '2'
  $pages = & $py -c "from pypdf import PdfReader; print(len(PdfReader(r'build\_merged.pdf').pages))"
  Write-Host "merged pages: $pages"
  & $node scripts\make-numbers.mjs ([int]$pages - 2)
  & $node scripts\print-pdf.mjs --input build\_numbers.html --output build\_numbers.pdf --zero-margins --no-header --no-footer
  & $py scripts\pdf_merge.py overlay build\_merged.pdf build\_numbers.pdf $pass1 2
  if (-not (Test-Path $pass1)) { Write-Host 'ABORT: no pass1'; exit 1 }
}

Write-Host 'resolve TOC from pass 1 ...'
& $py scripts\resolve_toc.py $pass1 build\toc-items.json build\toc-map-1.json

Write-Host 'pass 2: rebuild HTML with provisional numbers ...'
& $node scripts\build.mjs --allow-partial --toc-map build\toc-map-1.json
& $node scripts\print-split.mjs --input build\量化数学进阶教材.html --output $pass2
if (-not (Test-Path $pass2)) { Write-Host 'ABORT: no pass2'; exit 1 }
& $py scripts\resolve_toc.py $pass2 build\toc-items.json build\toc-map.json

Write-Host 'pass 3: rebuild with resolved numbers and print final ...'
& $node scripts\build.mjs --allow-partial --toc-map build\toc-map.json
& $node scripts\print-split.mjs --input build\量化数学进阶教材.html --output $final

Write-Host 'verify drift ...'
& $py scripts\resolve_toc.py $final build\toc-items.json build\toc-map-verify.json
& $py -c @"
import json
a = json.load(open(r'$root\build\toc-map.json', encoding='utf-8'))
b = json.load(open(r'$root\build\toc-map-verify.json', encoding='utf-8'))
common = [k for k in a if k in b]
drift = {k: (a[k], b[k]) for k in common if a[k] != b[k]}
print(json.dumps({'compared': len(common), 'driftedEntries': len(drift), 'sampleDrift': dict(list(drift.items())[:8])}, ensure_ascii=False, indent=1))
"@
Write-Host 'done'
