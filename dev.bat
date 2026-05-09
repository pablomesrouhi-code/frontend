@echo off
cd /d "%~dp0"
where npm >nul 2>&1
if %ERRORLEVEL% equ 0 (
  call npm run dev
) else if exist "C:\Program Files\nodejs\npm.cmd" (
  call "C:\Program Files\nodejs\npm.cmd" run dev
) else (
  echo [خطأ] npm غير موجود. ثبّت Node.js من https://nodejs.org
  echo أو أضف مجلد nodejs لمتغير PATH ثم جرّب: npm run dev
  pause
  exit /b 1
)
