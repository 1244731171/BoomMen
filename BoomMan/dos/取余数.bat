@echo off
set /a c=%random%*100/65535%%10
set /a a=%c%%%2
echo %c%
echo %a%

set "a=2"
set "b=3"

if %a%==%a% (
echo %a%
echo %a%
) else echo %b%

pause