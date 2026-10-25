param([ValidateSet('dev', 'check', 'build', 'start')][string]$Task = 'dev')
$ErrorActionPreference = 'Stop'
$nikeWorkspace = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $nikeWorkspace
$env:PATH = (Join-Path $nikeWorkspace 'node_modules/.node-runtime') + ';' + $env:PATH
$env:npm_config_cache = Join-Path $nikeWorkspace 'temp/npm-cache'
$env:TEMP = Join-Path $nikeWorkspace 'temp'
$env:TMP = $env:TEMP
$env:NEXT_TELEMETRY_DISABLED = '1'
& (Join-Path $nikeWorkspace 'node_modules/.node-runtime/node.exe') (Join-Path $nikeWorkspace 'node_modules/.node-runtime/node_modules/npm/bin/npm-cli.js') --prefix apps/nike run $Task
exit $LASTEXITCODE
