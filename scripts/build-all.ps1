<#
  Full publication pipeline for 《量化数学进阶教材》.
  Stages: validate -> math lint -> assemble -> pandoc docx -> postprocess -> LibreOffice PDF.
  Usage:
    pwsh -File scripts\build-all.ps1                 # strict: abort on any validation error
    pwsh -File scripts\build-all.ps1 -AllowPartial   # build with whatever chapters exist so far
#>
param([switch]$AllowPartial)

$ErrorActionPreference = 'Stop'
$root  = Split-Path -Parent $PSScriptRoot
$node  = 'D:\deepseek-harness\data\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe'
$py    = 'D:\deepseek-harness\data\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe'
$loNode = 'D:\DeepSeek-Harness-Desktop\resources\runtime\primary-runtime\dependencies\node\bin\node.exe'
$loCli  = 'D:\DeepSeek-Harness-Desktop\resources\app.asar.unpacked\dsh\node_modules\@deepseek-ai\libreoffice-kit\lib\cli.js'
$pandoc = Join-Path $root 'build\pandoc.exe'

$partialFlag = if ($AllowPartial) { @('--allow-partial') } else { @() }
Set-Location $root

function Stage($name) { Write-Host "`n=== $name ===" -ForegroundColor Cyan }

Stage '1/6 结构与编号校验'
& $node 'scripts\validate.mjs' @partialFlag
if ($LASTEXITCODE -ne 0 -and -not $AllowPartial) { throw 'validate.mjs 报告错误；修复后再构建（或加 -AllowPartial 生成阶段版本）' }

Stage '2/6 公式可渲染性校验 (KaTeX)'
& $node 'scripts\lint-math.mjs'
if ($LASTEXITCODE -ne 0) { throw 'lint-math.mjs 发现无法渲染的公式' }

Stage '3/6 汇编为单一 Markdown'
$md = Join-Path $root 'build\量化数学进阶教材.md'
if (Test-Path $md) { Remove-Item $md -Force }   # never let a stale manuscript flow downstream
& $node 'scripts\assemble.mjs' @partialFlag
if ($LASTEXITCODE -ne 0 -or -not (Test-Path $md)) { throw '汇编失败，未生成 Markdown' }

Stage '4/6 Pandoc 转换为 DOCX'
if (-not (Test-Path $pandoc)) { throw "未找到 pandoc: $pandoc" }
$raw = Join-Path $root 'build\量化数学进阶教材-raw.docx'
if (Test-Path $raw) { Remove-Item $raw -Force } # never reuse a previous conversion
# Build each switch as ONE argument: splitting "--reference-doc=" from its path makes
# pandoc treat the template as a second input file.
$refArg  = '--reference-doc=' + (Join-Path $root 'assets\reference.docx')
$mdPandoc = Join-Path $root 'build\量化数学进阶教材.pandoc.md'
if (-not (Test-Path $mdPandoc)) { throw "缺少 Pandoc 专用汇编文件：$mdPandoc" }
$pandocArgs = @(
  $mdPandoc, '-o', $raw,
  '--toc', '--toc-depth=3',
  $refArg,
  '--metadata', 'title=量化数学进阶教材',
  '--metadata', 'subtitle=从数学证明到量化研究',
  '--metadata', 'lang=zh-CN'
)
& $pandoc @pandocArgs 2>&1 | ForEach-Object { Write-Host "  pandoc: $_" }
if ($LASTEXITCODE -ne 0) { throw "Pandoc 退出码 $LASTEXITCODE" }
if (-not (Test-Path $raw)) { throw 'Pandoc 未生成 DOCX' }

Stage '5/6 版式后处理'
$docx = Join-Path $root '量化数学进阶教材.docx'
& $py 'scripts\postprocess_docx.py' $raw $docx

Stage '6/6 导出 PDF (LibreOffice)'
$pdf = Join-Path $root '量化数学进阶教材.pdf'
if (Test-Path $pdf) { Remove-Item $pdf -Force }
# The LibreOffice helper has been observed to crash (0xC0000005) on large documents;
# retry once before treating it as a hard failure.
for ($attempt = 1; $attempt -le 2 -and -not (Test-Path $pdf); $attempt++) {
  if ($attempt -gt 1) { Write-Host "  重试 PDF 导出（第 $attempt 次）..." -ForegroundColor Yellow; Start-Sleep -Seconds 3 }
  $lo = & $loNode $loCli convert --input $docx --output $pdf 2>&1
  $lo | ForEach-Object { Write-Host "  libreoffice: $_" }
}
if (-not (Test-Path $pdf)) { throw 'PDF 导出失败' }
$sig = [System.Text.Encoding]::ASCII.GetString([System.IO.File]::ReadAllBytes($pdf)[0..4])
if ($sig -ne '%PDF-') { throw "PDF 签名异常: $sig" }

$pages = $null
try {
  $bytes = [System.IO.File]::ReadAllBytes($pdf)
  $text = [System.Text.Encoding]::ASCII.GetString($bytes)
  $pages = ([regex]::Matches($text, '/Type\s*/Page[^s]')).Count
} catch {}

Write-Host "`n构建完成" -ForegroundColor Green
Get-Item $md, $docx, $pdf | Select-Object Name, @{n='KB';e={[math]::Round($_.Length/1KB)}}, LastWriteTime | Format-Table -AutoSize
Write-Host "PDF 页数(估算): $pages"
