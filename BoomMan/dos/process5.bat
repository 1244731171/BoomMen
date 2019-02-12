@echo off&setlocal enabledelayedexpansion
title 进度条 by:金则宇 2011年4月5日
mode con lines=7 cols=55
set z=0
SET ge=0
for /l %%i in (1,1,25) do (
  set "a%%i=  "
  set "c=!c!▉"
  set "d=!d! "
)
:1
set /a z+=4
for /l %%i in (1,1,3) do ping /n 1 127.1>nul
set /a ge+=1
set "a%ge%=▉"
set jdt=
for /l %%i in (1,1,25) do set "jdt=!jdt!!a%%i!"
cls
echo ┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
echo ┃%jdt%┃
echo ┗━━━━━━━━━━━━━━━━━━━━━━━━━┛
echo %d:~1%%z%﹪
if "%jdt%"=="%c%" echo OK^! &pause >nul & exit
goto 1