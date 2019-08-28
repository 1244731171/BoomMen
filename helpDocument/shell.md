# 查询端口
``` shell
    # 查询所有在监听端口
    netstat -ano
    # 查询具体在监听端口
    netstat -ano | findstr xxx     
```

# 杀进程
``` shell
    # 杀进程 xxx 为进程id
    taskkill /pid xxx /F
```