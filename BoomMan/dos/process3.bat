@echo off
cls 
echo. 
echo 程序正在初始化. . .
echo.
for /L %%i in (1 1 10) do set /p a=█<nul&ping /n 1 127.0.0.1>nul 
echo 100%%
pause