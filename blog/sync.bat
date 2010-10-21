title Sync Blogger...
::Start...
echo Start synchronizing...

:PULL
git pull origin master

:PUSH
echo Commit changes...

:: get date and time
for /f "delims=" %%a in ('date/t') do @set mydate=%%a
for /f "delims=" %%a in ('time/t') do @set mytime=%%a
set fvar=%mydate%%mytime%

:: add all new files
call git add .
call git commit -a -m "Automated commit on %fvar%"

:: check if ssh-agent is running
REM tasklist|find /i "ssh-agent.exe" || cmd /c ""C:\Program Files\Git\bin\sh.exe" --login -i" && exit
call git push origin master
