@echo off
title Push Hycal to GitHub
cd /d "C:\Users\abdul\Downloads\H!VAC"
set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%LOCALAPPDATA%\Programs\MinGit\mingw64\bin;%PATH%"
echo ========================================================
echo   Pushing Hycal Aircon Website to GitHub
echo   Target: https://github.com/ahad-016/hycal.git
echo ========================================================
echo.
git push -f -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo  [SUCCESS] All code pushed to GitHub successfully!
    echo  Vercel will now automatically build and deploy!
    echo  View repository: https://github.com/ahad-016/hycal
    echo ========================================================
) else (
    echo.
    echo [NOTE]:
    echo When GitHub prompts you in your browser, click 'Sign in with browser'
    echo and click 'Authorize' to grant Git write access.
)
echo.
pause
