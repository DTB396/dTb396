$ErrorActionPreference = "Stop"

if (-not $env:BARBER_CAM_TOOLS -or $env:BARBER_CAM_TOOLS.Trim() -eq "") {
  Write-Host "BARBER_CAM_TOOLS is not set." -ForegroundColor Yellow
  Write-Host "Add this to your PowerShell profile and restart:" -ForegroundColor Yellow
  Write-Host '  $env:BARBER_CAM_TOOLS = "C:\barber-cam\tools"' -ForegroundColor Yellow
  exit 1
}

$tools = $env:BARBER_CAM_TOOLS
$script = Join-Path $tools "cf-pages-build.ps1"

Write-Host "BARBER_CAM_TOOLS = $tools"
if (!(Test-Path -LiteralPath $script)) {
  Write-Host "Missing: $script" -ForegroundColor Red
  exit 1
}

Write-Host "OK: Found cf-pages-build.ps1" -ForegroundColor Green
