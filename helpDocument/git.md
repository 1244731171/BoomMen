工作区 working tree | ide  
缓存区 stage | index  
本地仓库 本地版本库 local | HEAD  
远程仓库 远程版本库 remote  
  
### 提交操作 ###  
`git add .` 工作区 ==更新==> 缓存区  
`git commit -m xx` 缓存区 ==更新==> 本地仓库  
`git commit -am xx` 工作区 ==更新==> 本地仓库  
`git push` 本地仓库 ==更新==> 远程仓库  
  
### 文件操作 ###  
`git checkout -- xx` 缓存区 ==回滚==> 工作区  
`git checkout HEAD xx` 本地仓库 ==回滚==> 工作区 + 缓存区  
  
### 对比操作 ###
`git add .` 后 `git diff` 无区别  
`git commit` 后 `git diff --cached` 无区别  
  
### git commit ###  
``` shell
    # 缓存区 ==> 本地仓库(只将已经执行过 `git add .`的代码提交)
    git commit -m "log" # log 单引号的话 空格会报错
    # 工作区 ==> 本地仓库(将没执行过 `git add .`的代码一并提交)
    git commit -am "log" # log 单引号的话 空格会报错
    # 或
    git commit -a -m "log" # log 单引号的话 空格会报错
```
  
### git diff ### 
``` shell
    # 查看工作区和缓存区的区别
    git diff [<path>...]
    # 查看工作区和本地仓库的区别
    git diff HEAD [<path>...]
    # 查看缓存区和本地仓库的区别
    git diff --cached [<path>...]
```

### git rm --cached ###   
``` shell
    # 不会删除物理文件, 只是将已经add进缓存的文件删除
    git rm --cached [<path>...]
```

### git checkout ###
``` shell
    # 1. 从本地仓库恢复文件, --|HEAD很重要, 不加就变成切分支了
    # 1.1. -- 前缀, 缓存区 ==覆盖==> 工作区, 只涉及缓存区和工作区的操作
    git checkout -- [.|<path>...]
    # 1.2. HEAD 前缀, 本地仓库 ==覆盖==> 工作区 + 缓存区
    git checkout HEAD [.|<path>...]
```

### git reset ###
``` shell
    # 1.撤销add操作（本地仓库 ==覆盖==> 缓存区）
    git reset [HEAD] [.|<path>...]

    # 2.撤销commit操作
    # 2.1.撤销commit操作, 重置 本地仓库 + 缓存区 + 工作区, 直接覆盖, 不保留代码
    git reset --hard commit_id [<path>...]
    # 验证
    git diff # 工作区和缓存区 无区别
    git diff HEAD # 工作区和本地仓库 无区别
    git diff --cached # 缓存区和本地仓库 无区别

    # 2.1.撤销commit操作, 重置 本地仓库 + 缓存区, 保留 工作区 修改
    git reset commit_id [<path>...]
    # 或
    git reset --mixed commit_id [<path>...]
    # 验证
    git diff # 工作区和缓存区 有区别
    git diff HEAD # 工作区和本地仓库 有区别
    git diff --cached # 缓存区和本地仓库 无区别

    # 2.1.撤销commit操作, 重置 本地仓库, 保留 工作区 + 缓存区 修改
    git reset --soft commit_id [<path>...]
    # 验证
    git diff # 工作区和缓存区 无区别
    git diff HEAD # 工作区和本地仓库 有区别
    git diff --cached # 缓存区和本地仓库 有区别
```

1. checkout恢复操作影响范围
2. 如何撤销commit

https:#blog.csdn.net/cankingapp/article/details/18312117
https:#blog.csdn.net/ustccw/article/details/79068547
https:#blog.csdn.net/afzaici/article/details/52711985
https:#www.jianshu.com/p/4090ba4f9963
https:#www.yiibai.com/git/git_checkout.html
https:#www.cnblogs.com/qianqiannian/p/6010219.html
https:#blog.csdn.net/lixiuxiu2017/article/details/79495884
https:#blog.csdn.net/meng19910117/article/details/84402456
https:#blog.csdn.net/u013374164/article/details/78831273
https:#www.cnblogs.com/yelbosh/p/7471979.html