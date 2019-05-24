### 名词对照 ###  
工作区                   working tree | ide  
缓存区                   stage | index  
本地仓库 | 本地版本库     local | HEAD  
远程仓库 | 远程版本库     remote  
  
### 提交操作 ###  
`git add .` 工作区 ==更新==> 缓存区  
`git commit -m xx` 缓存区 ==更新==> 本地仓库  
`git commit -am xx` 工作区 ==更新==> 本地仓库  
`git push` 本地仓库 ==更新==> 远程仓库  
    
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
    # 验证
    git diff # 工作区和缓存区 无区别
    
    # 1.2. HEAD 前缀, 本地仓库 ==覆盖==> 工作区 + 缓存区
    git checkout HEAD [.|<path>...]
    # 验证
    git diff # 工作区和缓存区 无区别
    git diff HEAD # 工作区和本地仓库 无区别
    git diff --cached # 缓存区和本地仓库 无区别
```
  
### git reset ###
``` shell
    # 1.撤销add操作（本地仓库 ==覆盖==> 缓存区）
    git reset [HEAD] [<path>...]
    # 验证
    git diff # 工作区和缓存区 无区别

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

### git revert ###
``` shell
    # 回退到上一次提交的状态，按照某一次的commit完全反向的进行一次commit.(代码回滚到上个版本，并提交git)
    git revert HEAD
```

### 退出mergeing状态 ###
``` shell
    git merge --abort #如果Git版本 >= 1.7.4
    git reset --merge #如果Git版本 >= 1.6.1
```

### git merge时“交换文件.MERGE_MSG.swp已经存在”的问题 ###
``` shell
    # 中止合并
    git merge -abort  
    # 删除 vim 非正常关闭产生的文件
    rm .git/.MERGE_MSG.sw* 
```

### git branch 和 git checkout ###
``` shell
    # 查看全部分支
    git branch -a
    # 查看本地分支
    git branch
    # 生成本地分支
    git branch xxx
    # 切换本地分支
    git checkout xxx
    # 生产并切换本地分支（等同上面两步）
    git checkout -b xxx
    # 拽取并切换远程分支
    git checkout -b xxx origin/yyy
    # 删除分支
    git branch -d xxx
```

### git pull ###
``` shell
    # 拉取分支自动合并（经常冲突，或者覆盖源码）
    # 等同于 git fetch + git merge
    git pull 
    # 等同于 git fetch + git rebase
    git pull --rebase
```

### git merge ###
``` shell
    # 手动合并代码（分支中的commit记录会被合并到master中，分支和master没有分支）
    git merge branchxxx
    # 手动合并代码（将分支以分叉形式合并到master中，分支中的commmit记录不会合并到master中，分支和maste分明显分开）
    git merge branchxxx --no-ff
```
![图示](https://raw.githubusercontent.com/CJuNing/BoomMen/master/helpDocument/git merge.png)

### git fetch 和 git pull 的区别 ###
  
### 参考 ###
https://blog.csdn.net/cankingapp/article/details/18312117
https://blog.csdn.net/ustccw/article/details/79068547
https://blog.csdn.net/afzaici/article/details/52711985
https://www.jianshu.com/p/4090ba4f9963
https://www.yiibai.com/git/git_checkout.html
https://www.cnblogs.com/qianqiannian/p/6010219.html
https://blog.csdn.net/lixiuxiu2017/article/details/79495884
https://blog.csdn.net/meng19910117/article/details/84402456
https://blog.csdn.net/u013374164/article/details/78831273
https://www.cnblogs.com/yelbosh/p/7471979.html
https://blog.csdn.net/ustccw/article/details/79068547
https://blog.csdn.net/cankingapp/article/details/18312117
https://blog.csdn.net/riddle1981/article/details/74938111