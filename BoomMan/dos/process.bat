@echo off
mode con cols=90 lines=30&color 9f 
cls 
echo. 
echo 程序正在初始化. . .
echo. 
echo ┌──────────────────────────────────────┐ 
set/p= ■<nul
for /L %%i in (1 1 38) do set /p a=■<nul&ping /n 2 127.0.0.1>nul 
echo 100%%
echo └──────────────────────────────────────┘
pause