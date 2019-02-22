@echo off
setlocal enabledelayedexpansion
:0
set min=100
set /a r=!random!*100
set /a r=!r!/32767+%min%
echo %r%
goto T3
    set b=123
    echo %r%
if %r% geq 50 (
    set b=456
    goto T2
)else goto T1

:T1 
    echo 1
    echo 2
    pause

:T2 
    echo %b%
    pause

:T3 
    echo asdasd
    pause
pause