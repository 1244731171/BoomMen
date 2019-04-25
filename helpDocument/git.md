工作区 ide
缓存区 stage index
本地仓库 本地版本库 local
远程仓库 远程版本库 remote

工作区 git add . ==> 缓存区
缓存区 git commit ==> 本地仓库
本地仓库 git push ==> 远程仓库

### git diff意义
``` shell
    // 查看工作区和缓存区的区别
    git diff [<path>...]
    // 查看工作区和本地仓库的区别
    git diff HEAD [<path>...]
    // 查看缓存区和本地仓库的区别
    git diff --cached [<path>...]
```