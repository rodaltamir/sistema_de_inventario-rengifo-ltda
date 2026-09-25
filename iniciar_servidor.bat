@echo off
setlocal enabledelayedexpansion

echo Buscando la IP local de esta computadora...
set LOCAL_IP=
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4" ^| findstr "192.168."') do (
    for /f "tokens=1" %%b in ("%%a") do (
        if "!LOCAL_IP!"=="" set LOCAL_IP=%%b
    )
)

if "!LOCAL_IP!"=="" (
    echo No se encontro una IP en el rango 192.168.x.x
    echo Buscando en el rango 10.x.x.x...
    for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4" ^| findstr "10."') do (
        for /f "tokens=1" %%b in ("%%a") do (
            if "!LOCAL_IP!"=="" set LOCAL_IP=%%b
        )
    )
)

if "!LOCAL_IP!"=="" (
    echo [ERROR] No se pudo detectar la IP de la red local.
    pause
    exit /b
)

echo IP detectada: !LOCAL_IP!
echo Actualizando variables de entorno para Docker...

set NEXTAUTH_URL=http://rengifo_ltda:8080
echo NEXTAUTH_URL asignado a: %NEXTAUTH_URL%

echo.
echo Levantando los contenedores de Docker...
docker-compose up -d

echo.
echo ========================================================
echo EL SISTEMA ESTA LISTO.
echo.
echo Para entrar desde esta PC o cualquier otra en la red local:
echo http://rengifo_ltda:8080
echo.
echo (Acceso alternativo por IP directa si fuera necesario):
echo http://!LOCAL_IP!:8080
echo ========================================================
pause
