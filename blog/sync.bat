@echo off
title Sync Blogger...

:PULL
::Start...
echo Start synchronizing...
git pull origin master


:CONFIRM
echo ""
echo "======================================================================"
set /p doPush=continue(y/n)?
if "%doPush%"=="y" goto PUSH
if "%doPush%"=="n" goto DONE
goto OONFIRM


:PUSH
echo Commit changes...

:: get date and time
:: for /f "delims=" %%a in ('date/t') do @set mydate=%%a
:: for /f "delims=" %%a in ('time/t') do @set mytime=%%a
set mydate=%DATE:~0,10%
set mytime=%TIME:~0,8%
set fvar=%mydate% %mytime%

:: add all new files
call git add .
call git commit -a -m "Automatic commit on %fvar%"

:: check if ssh-agent is running
:: tasklist|find /i "ssh-agent.exe" || cmd /c ""C:\Program Files\Git\bin\sh.exe" --login -i" && exit
call git push origin master

echo ""
echo "======================================================================"
echo Synchronization is complete.

:DONE
pause
