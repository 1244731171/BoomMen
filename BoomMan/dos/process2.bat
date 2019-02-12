@echo off
setlocal ENABLEDELAYEDEXPANSION
set d=10
:begin
cls
echo 这是一个进度条动画模拟程序
echo.
echo 正在读取中...
echo.
set a=">>>>>>>>>>"
set b=----------
set /a c+=1
set /a d-=1
set /a z+=10
echo (!a:~1,%c%!!b:~0,%d%!)%z%%%
echo.&echo.&echo.
echo 可以看出，以上所有文字都没有被清屏，只有偶尔的闪烁。
echo.
ping /n 2 127.1>nul
if not %c%==10 goto begin
pause