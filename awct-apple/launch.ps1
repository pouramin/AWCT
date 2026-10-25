param([ValidateSet('dev','check','build','start')][string]$Action='dev')
$ErrorActionPreference='Stop'
Push-Location $PSScriptRoot
try {
  $localFiles=Join-Path $PSScriptRoot '.export-local'
  New-Item -ItemType Directory -Force $localFiles | Out-Null
  $env:npm_config_cache=Join-Path $localFiles 'npm-cache'
  $env:TEMP=$localFiles
  $env:TMP=$localFiles
  $env:NEXT_TELEMETRY_DISABLED='1'
  if ($Action -ne 'start') {
    & npm.cmd ci
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  }
  & npm.cmd run $Action
  exit $LASTEXITCODE
} finally { Pop-Location }
