$ErrorActionPreference = "Stop"

if (-not $env:BARBER_CAM_TOOLS -or $env:BARBER_CAM_TOOLS.Trim() -eq "") {
  throw 'BARBER_CAM_TOOLS is not set. Add to profile: $env:BARBER_CAM_TOOLS = "C:\barber-cam\tools" and restart.'
}

$tools = $env:BARBER_CAM_TOOLS
$builder = Join-Path $tools "cf-pages-build.ps1"
if (!(Test-Path -LiteralPath $builder)) {
  throw ("Missing builder script: {0}" -f $builder)
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

& pwsh -NoProfile -ExecutionPolicy Bypass -File $builder -RepoRoot $repoRoot -Clean
