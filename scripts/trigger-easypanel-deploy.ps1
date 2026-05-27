# Local deploy trigger. Copy deploy.env.example → deploy.env with your EasyPanel webhook URL.
# Usage (from frontend folder): .\scripts\trigger-easypanel-deploy.ps1

$ErrorActionPreference = 'Stop'
$frontendRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $frontendRoot 'deploy.env'
if (-not (Test-Path $envFile)) {
  Write-Host "Missing frontend/deploy.env — copy deploy.env.example and set EASY_PANEL_DEPLOY_URL"
  exit 1
}
foreach ($line in Get-Content $envFile) {
  if ($line -match '^\s*EASY_PANEL_DEPLOY_URL=(.+)$') {
    $url = $Matches[1].Trim().Trim('"')
    Write-Host "Triggering EasyPanel deploy..."
    curl.exe -fsS -X POST $url
    if ($LASTEXITCODE -ne 0) { curl.exe -fsS $url }
    Write-Host "Done. Wait ~2 min then hard-refresh nabtalabo.store"
    exit 0
  }
}
Write-Host "EASY_PANEL_DEPLOY_URL not found in deploy.env"
exit 1
