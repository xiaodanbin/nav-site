@echo off
setlocal EnableDelayedExpansion

:: 获取脚本所在目录（放在项目根目录）
set "SCRIPT_DIR=%~dp0"
set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

:: 启动服务器（不显示黑窗口）
> "%TEMP%\nav_server.vbs" (
    echo Set W = CreateObject("WScript.Shell")
    echo W.CurrentDirectory = "%SCRIPT_DIR%"
    echo W.Run "cmd /c npx serve . -p 3000", 0, 0
)
cscript //nologo "%TEMP%\nav_server.vbs"

:: 等待服务器启动
timeout /t 3 /nobreak >nul

:: 打开浏览器
start http://localhost:3000/admin.html

:: 清理临时文件
del "%TEMP%\nav_server.vbs" 2>nul

endlocal & exit
