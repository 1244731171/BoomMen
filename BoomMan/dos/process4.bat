@echo off
setlocal enabledelayedexpansion
mode con lines=10 cols=55
set z=0
set nub=0
set lastz=0
set mion=0
set ge=0
for /l %%i in (1,1,25) do (
  set "a%%i=  "
  set "c=!c!¨"
  set "d=!d! "
)
echo Init...
choice /t 5 /d y /n >nul
cls
echo Connecting...
:1
    set /a r=!random!*60
    set /a r=!r!/32767+%mion%
    set /a nub+=1
    choice /t %r% /d y /n >nul
    cls
    echo Init...
    echo Connected
    echo.
    if %nub% geq 2 goto 2
    if %nub% lss 2 goto 1
:2  
    set /a r = %random%*100
    set /a r = !r!/32767
    if %r% geq 50 (
        set /a z+=1
        goto T1
    )else goto T2
:T1
    set /a disz=!z!-!lastz!
    if %z% geq 10 set "mion=60"
    if %z% geq 33 set "mion=120" 
    if %z% geq 90 set "mion=90" 
    if %z% geq 95 set "mion=60" 
    if not %disz%==4 goto T2
    set lastz=%z%
    set /a ge+=1
    set "a%ge%=¨"
    set jdt=
    for /l %%i in (1,1,25) do set "jdt=!jdt!!a%%i!" 
:T2
    set /a ll= %nub%%%3
    if %ll% == 0 echo Searching for all available website.
    if %ll% == 1 echo Searching for all available website..
    if %ll% == 2 echo Searching for all available website...
    if %z% geq 100 set "z=100"
    echo ©³©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©·
    echo ©§%jdt%©§
    echo ©»©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¥©¿
    echo %d:~1%Processing:%z%©‡
    if "%jdt%"=="%c%" echo Search is complete! ^! &pause >nul & exit
    goto 1