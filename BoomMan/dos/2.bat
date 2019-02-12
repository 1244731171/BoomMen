================================================
@echo off
title 正在显示进度条动画...
mode con cols=50 lines=15
setlocal ENABLEDELAYEDEXPANSION
set d=10
:begin
cls
echo.&echo.&echo.&echo.&echo.&
set a=">>>>>>>>>>"
set b=----------
set /a c+=1
set /a d-=1
set /a z+=10
echo                  (!a:~1,%c%!!b:~0,%d%!)%z%%%
ping /n 2 127.1>nul
if not %c%==10 goto begin
ping /n 2 127.1>nul
exit