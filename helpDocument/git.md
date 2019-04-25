工作区 ide  
缓存区 stage index  
本地仓库 本地版本库 local  
远程仓库 远程版本库 remote  
  
工作区 `git add .` ==> 缓存区  
缓存区 `git commit` ==> 本地仓库  
本地仓库 `git push` ==> 远程仓库  
  
`git add .` 后 `git diff` 无区别  
`git diff HEAD` 后 `git diff` 无区别  

### git commit ###
``` shell
    // 缓存区 ==> 本地仓库（只将已经执行过 `git add .`的代码提交）
    git commit -m "log" # log 单引号的话 空格会报错
    // 工作区 ==> 本地仓库（将没执行过 `git add .`的代码一并提交）
    git commit -am "log" # log 单引号的话 空格会报错
    // 或
    git commit -a -m "log" # log 单引号的话 空格会报错
```
  
### git diff ### 
``` shell
    // 查看工作区和缓存区的区别
    git diff [<path>...]
    // 查看工作区和本地仓库的区别
    git diff HEAD [<path>...]
    // 查看缓存区和本地仓库的区别
    git diff --cached [<path>...]
```

### git rm --cached ###   
``` shell
    // 不会删除物理文件，只是将已经add进缓存的文件删除
    git rm --cached [<path>...]
```

### git checkout ###
``` shell
```

1. checkout恢复操作影响范围
2. 如何撤销commit

https://blog.csdn.net/afzaici/article/details/52711985
https://www.jianshu.com/p/4090ba4f9963
https://www.yiibai.com/git/git_checkout.html
https://www.cnblogs.com/qianqiannian/p/6010219.html
https://blog.csdn.net/lixiuxiu2017/article/details/79495884
https://blog.csdn.net/meng19910117/article/details/84402456
https://blog.csdn.net/u013374164/article/details/78831273
https://www.cnblogs.com/yelbosh/p/7471979.html