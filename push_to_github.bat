@echo off
title Push Hycal to GitHub
cd /d "C:\Users\abdul\Downloads\H!VAC"
set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%LOCALAPPDATA%\Programs\MinGit\mingw64\bin;%PATH%"
echo ========================================================
echo   Pushing Hycal Aircon Website to GitHub
echo   Target: https://github.com/ahad-016/hycal.git
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo  [SUCCESS] Repository pushed to GitHub successfully!
    echo  View it here: https://github.com/ahad-016/hycal
    echo ========================================================
) else (
    echo.
    echo [NOTE]:
    echo When GitHub opens in your browser, click 'Sign in with your browser'
    echo and authorize Git to push to your repository.
)
echo.
pause
