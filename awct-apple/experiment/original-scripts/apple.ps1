param(
  [ValidateSet('dev', 'check', 'start')]
  [string]$Action = 'dev'
)
$taskRoot = Split-Path $PSScriptRoot -Parent
$env:PATH = (Join-Path $taskRoot 'node_modules/.node-runtime') + ';' + $env:PATH
$env:npm_config_cache = Join-Path $taskRoot 'temp/npm-cache'
$env:TEMP = Join-Path $taskRoot 'temp'
$env:TMP = $env:TEMP
$env:NEXT_TELEMETRY_DISABLED = '1'
Push-Location $taskRoot
try {
  npm --prefix apps/apple run $Action
  exit $LASTEXITCODE
} finally {
  Pop-Location
}
