# Caminho do arquivo .env
$envPath = ".env"

# Carregar variáveis do arquivo .env
if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
        $line = $_.Trim()
        if ($line -and $line -notlike "#*") {
            $name, $value = $line -split '=', 2
            [System.Environment]::SetEnvironmentVariable($name.Trim(), $value.Trim())
        }
    }
} else {
    Write-Host "Arquivo .env não encontrado. Certifique-se de que ele existe no diretório atual."
    exit 1
}

# Configurações
$CurrentDate = (Get-Date).ToString("dd-MM-yyyy")
$DB_HOST = $env:POSTGRES_HOST
$DB_USER = $env:POSTGRES_USER
$DB_NAME = $env:POSTGRES_DB
$DB_PASSWORD = $env:POSTGRES_PASSWORD
$BACKUP_FILE = "backup-$CurrentDate.dump"

if (-not $DB_HOST -or -not $DB_USER -or -not $DB_NAME -or -not $DB_PASSWORD) {
    Write-Host "Alguma variável do .env não foi carregada corretamente."
    exit 1
}

# Caminho atual
$CurrentDir = (Get-Location).Path

# Criar diretório backups
if (-not (Test-Path "$CurrentDir/backups")) {
    New-Item -ItemType Directory -Path "$CurrentDir/backups"
}

# Executar o comando Docker para realizar o backup
Write-Host "Realizando o backup do banco de dados $DB_NAME..."
$command = @"
docker run --rm --network=demonstracao_lgpd_default -v "$CurrentDir/backups:/backups" -e PGPASSWORD="$DB_PASSWORD" postgres:latest pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -F c -f /backups/$BACKUP_FILE
"@

Invoke-Expression $command

# Verificar se o backup foi bem-sucedido
if ($LASTEXITCODE -eq 0) {
    Write-Host "Backup concluído com sucesso! Arquivo salvo como $BACKUP_FILE."
} else {
    Write-Host "Erro ao realizar o backup."
    exit 1
}
