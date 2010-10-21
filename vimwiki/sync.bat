@echo off
title Sync Wiki

:PULL
echo Wiki sync(pull) starting...
echo .
git pull origin master

echo .
echo ==============================================================================
git status

echo .
echo ==============================================================================
:LABEL_CONFIRM
set /p doPush=Pull from server completed, continue to push(y/n)?
if "%doPush%"=="y" goto LABEL_PUSH
if "%doPush%"=="n" goto exit
goto LABEL_CONFIRM


:LABEL_PUSH
echo .

:: get date and time
:: for /f "delims=" %%a in ('date/t') do @set mydate=%%a
:: for /f "delims=" %%a in ('time/t') do @set mytime=%%a
set mydate=%DATE:~0,10%
set mytime=%TIME:~0,8%
set fvar=%mydate% %mytime%

git add .
git commit -a -m "Automatic commit wiki at %fvar%"

:: check if ssh-agent is running
:: tasklist|find /i "ssh-agent.exe" || cmd /c ""C:\Program Files\Git\bin\sh.exe" --login -i" && exit
call git push origin master

echo .
echo  .---------------------------------------------------------------------------.
echo  '                                                                           '
echo  '                            Sync complete!                                 '
echo  '                                                                           '
echo  `---------------------------------------------------------------------------+

:LABEL_DONE
pause
