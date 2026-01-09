$ErrorActionPreference = "Stop"

param(
  [string]$DatabasePath = (Join-Path $PSScriptRoot "command-database.json")
)

function Get-CommandDatabase {
  param([string]$Path)

  if (!(Test-Path -LiteralPath $Path)) {
    throw ("Missing command database: {0}" -f $Path)
  }

  $raw = Get-Content -LiteralPath $Path -Raw
  return $raw | ConvertFrom-Json
}

function Get-CommandFromDb {
  param(
    [object]$Db,
    [string]$Name
  )

  $match = $Db.commands | Where-Object { $_.name -eq $Name } | Select-Object -First 1
  if (-not $match) {
    throw ("Command not found: {0}" -f $Name)
  }

  return $match.command
}

function Invoke-MassExecute {
  param(
    [string[]]$Commands
  )

  foreach ($cmd in $Commands) {
    Write-Host ("Executing: {0}" -f $cmd) -ForegroundColor Cyan
    Invoke-Expression $cmd
  }

  Write-Host "All commands executed successfully!" -ForegroundColor Green
}

function Invoke-CommandSet {
  param(
    [object]$Db,
    [string]$SetName
  )

  $set = $Db.commandSets | Where-Object { $_.name -eq $SetName } | Select-Object -First 1
  if (-not $set) {
    throw ("Command set not found: {0}" -f $SetName)
  }

  $expanded = foreach ($name in $set.commands) {
    Get-CommandFromDb -Db $Db -Name $name
  }

  Invoke-MassExecute -Commands $expanded
}

function Show-CommandCenter {
  param([object]$Db)

  while ($true) {
    Write-Host "Select a batch operation:" -ForegroundColor Cyan
    for ($i = 0; $i -lt $Db.commandSets.Count; $i++) {
      $set = $Db.commandSets[$i]
      Write-Host ("{0}. {1} - {2}" -f ($i + 1), $set.name, $set.description)
    }
    Write-Host ("{0}. Exit" -f ($Db.commandSets.Count + 1))

    $choice = Read-Host "Enter your choice"
    if ($choice -match "^\\d+$") {
      $index = [int]$choice - 1
      if ($index -ge 0 -and $index -lt $Db.commandSets.Count) {
        Invoke-CommandSet -Db $Db -SetName $Db.commandSets[$index].name
        continue
      }
      if ($index -eq $Db.commandSets.Count) {
        Write-Host "Exiting..." -ForegroundColor Yellow
        return
      }
    }

    Write-Host "Invalid choice!" -ForegroundColor Red
  }
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Push-Location $repoRoot
try {
  $db = Get-CommandDatabase -Path $DatabasePath
  Show-CommandCenter -Db $db
} finally {
  Pop-Location
}
