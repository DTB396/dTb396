$ErrorActionPreference = "Stop"

param(
  [ValidateSet("ours", "theirs")][string]$Strategy = "ours",
  [switch]$DryRun
)

function Get-UnmergedFiles {
  $files = git diff --name-only --diff-filter=U
  return $files | Where-Object { $_ -and $_.Trim() -ne "" }
}

function Get-ConflictMarkerFiles {
  $matches = rg -l "^(<<<<<<<|=======|>>>>>>>)" -S .
  return $matches | Where-Object { $_ -and $_.Trim() -ne "" }
}

$unmerged = Get-UnmergedFiles
if ($unmerged.Count -eq 0) {
  $conflicts = Get-ConflictMarkerFiles
  if ($conflicts.Count -eq 0) {
    Write-Host "No merge conflicts detected." -ForegroundColor Green
    exit 0
  }

  Write-Host "Conflict markers found without git conflict state:" -ForegroundColor Yellow
  $conflicts | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
  exit 1
}

Write-Host "Resolving merge conflicts using '$Strategy' strategy." -ForegroundColor Cyan
foreach ($file in $unmerged) {
  $command = "git checkout --$Strategy -- \"$file\""
  if ($DryRun) {
    Write-Host "DRY RUN: $command"
    Write-Host "DRY RUN: git add \"$file\""
    continue
  }

  & git checkout --$Strategy -- "$file"
  & git add "$file"
}

Write-Host "Conflicts resolved and staged." -ForegroundColor Green
