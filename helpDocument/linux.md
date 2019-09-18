# Linux 相关 #

## 操作 ##

### 查看当前用户对应的实际文件路径 ## 
``` shell
    # 就是查询 波浪下对应的实际路径
    echo ~
    # 或者
    echo $HOME
    # 波浪线~就是$HOME
```

### 删除文件 ### 
``` shell
    # 删除 + 确认
    rm /root/xxx
    # 删除 + 不确认
    rm -f /root/xxx
```

### 删除文件夹 ### 
``` shell
    # -r 代表着向下递推删除
    # 删除 + 确认
    rm -r /root/xxx
    # 删除 + 不确认
    rm -rf /root/xxx
```
