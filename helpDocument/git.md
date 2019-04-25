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
    git commit -m 'log'
    // 工作区 ==> 本地仓库（将没执行过 `git add .`的代码一并提交）
    git commit -am 'log'
    // 或
    git commit -a -m 'log'
```

### git diff意义 ### 
``` shell
    // 查看工作区和缓存区的区别
    git diff [<path>...]
    // 查看工作区和本地仓库的区别
    git diff HEAD [<path>...]
    // 查看缓存区和本地仓库的区别
    git diff --cached [<path>...]
```