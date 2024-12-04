param (
    [string]$BackupFile
)

# Verificar se o parâmetro foi fornecido
if (-not $BackupFile) {
    Write-Host "Por favor, forneça o nome do arquivo de backup como parâmetro."
    exit 1
}

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
$DB_HOST = $env:POSTGRES_HOST
$DB_USER = $env:POSTGRES_USER
$DB_NAME = $env:POSTGRES_DB
$DB_PASSWORD = $env:POSTGRES_PASSWORD

if (-not $DB_HOST -or -not $DB_USER -or -not $DB_NAME -or -not $DB_PASSWORD) {
    Write-Host "Alguma variável do .env não foi carregada corretamente."
    exit 1
}

# Caminho atual
$CurrentDir = (Get-Location).Path

# Validar se o arquivo de backup existe
if (-not (Test-Path "$CurrentDir/backups/$BackupFile")) {
    Write-Host "O arquivo de backup '$BackupFile' não foi encontrado no diretório backups."
    exit 1
}

# Restaurar o banco de dados
Write-Host "Restaurando o banco de dados $DB_NAME com o arquivo $BackupFile..."
$command = @"
docker run --rm --network=demonstracao_lgpd_default -v "$CurrentDir/backups:/backups" -e PGPASSWORD="$DB_PASSWORD" postgres:latest pg_restore --clean --if-exists -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" "/backups/$BackupFile"
"@

Invoke-Expression $command

# Verificar se a restauração foi bem-sucedida
if ($LASTEXITCODE -eq 0) {
    Write-Host "Restauração concluída com sucesso!"
} else {
    Write-Host "Erro ao restaurar o banco de dados."
    exit 1
}

# Lógica da Blacklist (aplicada após a restauração)
$BlacklistPath = "$CurrentDir/backups/blacklist.json"
if (-not (Test-Path $BlacklistPath)) {
    Write-Host "Arquivo blacklist.json não encontrado. Continuando sem aplicar a blacklist."
} else {
    # Ler os IDs da blacklist
    $Blacklist = Get-Content $BlacklistPath | ConvertFrom-Json
    $BlacklistIDs = $Blacklist.blacklist -join ", "

    # Validar se há IDs na blacklist
    if (-not $BlacklistIDs) {
        Write-Host "Nenhum ID encontrado na blacklist. Finalizando restauração."
    } else {
        Write-Host "Aplicando blacklist para os seguintes IDs: $BlacklistIDs"

        # Criar um comando SQL para remover os registros da blacklist
        $FilterSQL = @"
DELETE FROM usuario WHERE id_usuario IN ($BlacklistIDs);
"@

        # Executar o comando SQL para aplicar a blacklist
        Write-Host "Excluindo registros com IDs na blacklist..."
        docker run --rm --network=demonstracao_lgpd_default -e PGPASSWORD="$DB_PASSWORD" postgres:latest psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c "$FilterSQL"

        if ($LASTEXITCODE -ne 0) {
            Write-Host "Erro ao aplicar a blacklist. Verifique os logs para mais detalhes."
            exit 1
        } else {
            Write-Host "Blacklist aplicada com sucesso!"
        }
    }
}
