@echo off
setlocal enabledelayedexpansion

echo Buscando la IP local de esta computadora...
for /f "tokens=14" %%a in ('ipconfig ^| findstr IPv4 ^| findstr 192.168.') do set LOCAL_IP=%%a

if "!LOCAL_IP!"=="" (
    echo No se encontro una IP en el rango 192.168.x.x
    echo Buscando en el rango 10.x.x.x...
    for /f "tokens=14" %%a in ('ipconfig ^| findstr IPv4 ^| findstr 10.') do set LOCAL_IP=%%a
)

if "!LOCAL_IP!"=="" (
    echo [ERROR] No se pudo detectar la IP de la red local.
    pause
    exit /b
)

echo IP detectada: !LOCAL_IP!
echo Actualizando variables de entorno para Docker...

set NEXTAUTH_URL=http://!LOCAL_IP!
echo NEXTAUTH_URL asignado a: %NEXTAUTH_URL%

echo.
echo Levantando los contenedores de Docker...
docker-compose up -d

echo.
echo ========================================================
echo EL SISTEMA ESTA LISTO.
echo Para entrar desde esta PC o cualquier otra en la red, 
echo abre tu navegador web y visita:
echo http://!LOCAL_IP!
echo ========================================================
pause
