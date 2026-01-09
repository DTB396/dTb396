$ErrorActionPreference = "Stop"

param(
  [string]$Repo,
  [string]$Environment,
  [string[]]$States = @("failure", "error"),
  [int]$PerPage = 100
)

function Get-RepoFromGit {
  $origin = git config --get remote.origin.url
  if (-not $origin) {
    throw "Unable to determine repo. Provide -Repo owner/name or set a git remote."
  }

  if ($origin -match "^git@github.com:(?<owner>[^/]+)/(?<name>.+?)(\\.git)?$") {
    return ("{0}/{1}" -f $Matches.owner, $Matches.name)
  }

  if ($origin -match "^https://github.com/(?<owner>[^/]+)/(?<name>.+?)(\\.git)?$") {
    return ("{0}/{1}" -f $Matches.owner, $Matches.name)
  }

  throw ("Unsupported remote URL format: {0}" -f $origin)
}

function Invoke-GitHubApi {
  param(
    [Parameter(Mandatory = $true)][string]$Path
  )

  $token = $env:GITHUB_TOKEN
  if (-not $token) {
    throw "GITHUB_TOKEN is required to query deployments."
  }

  $headers = @{
    Authorization = "Bearer $token"
    Accept = "application/vnd.github+json"
    "User-Agent" = "xTx396.info-deployment-scan"
  }

  $uri = "https://api.github.com$Path"
  return Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
}

if (-not $Repo) {
  $Repo = Get-RepoFromGit
}

$deployments = Invoke-GitHubApi -Path ("/repos/{0}/deployments?per_page={1}" -f $Repo, $PerPage)
if (-not $deployments) {
  Write-Host "No deployments found for $Repo." -ForegroundColor Yellow
  exit 0
}

$failed = @()
foreach ($deployment in $deployments) {
  if ($Environment -and $deployment.environment -ne $Environment) {
    continue
  }

  $statuses = Invoke-GitHubApi -Path ("/repos/{0}/deployments/{1}/statuses?per_page=1" -f $Repo, $deployment.id)
  if (-not $statuses) {
    continue
  }

  $latest = $statuses | Select-Object -First 1
  if ($States -contains $latest.state) {
    $failed += [pscustomobject]@{
      Id = $deployment.id
      Ref = $deployment.ref
      Environment = $deployment.environment
      State = $latest.state
      UpdatedAt = $latest.updated_at
      Description = $latest.description
    }
  }
}

if (-not $failed) {
  Write-Host "No failed deployments found for $Repo." -ForegroundColor Green
  exit 0
}

Write-Host "Failed deployments for $Repo:" -ForegroundColor Red
$failed | Sort-Object -Property UpdatedAt -Descending | Format-Table -AutoSize
