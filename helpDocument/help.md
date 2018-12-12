
## 关于git生产ssh ##

生成步骤:

生成ssh，如果多个git账户需要重命名id_rsa文件名
``` cmd
$ ssh-keygen -t rsa -C "your_email@example.com"
# Creates a new ssh key, using the provided email as a label
# Generating public/private rsa key pair.
# Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]
Enter passphrase (empty for no passphrase): [Type a passphrase]
# Enter same passphrase again: [Type passphrase again]
```

接着会得到如下的提示：
``` cmd
Your identification has been saved in /c/Users/you/.ssh/id_rsa.
# Your public key has been saved in /c/Users/you/.ssh/id_rsa.pub.
# The key fingerprint is:
# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
```

然后将这个新的key添加到ssh-agent中：
``` cmd
$ ssh-agent -s
# Agent pid 59566
$ ssh-add ~/.ssh/id_rsa
```

*注*: 如果执行 ```ssh-add``` 时显示错误 ```Could not open a connection to your authentication agent.``` 那么执行
``` cmd
eval `ssh-agent -s`
```
后重新执行 ```ssh-add``` 那条命令即可。

第三步：将SSH key添加到你的GitHub账户

首先将公钥复制到粘贴板：
``` cmd
$ clip < ~/.ssh/id_rsa.pub
# Copies the contents of the id_rsa.pub file to your clipboard
```
或者使用文本编辑工具也能解决。

然后在github的账户页的右上角，点击配置（settings, 齿轮图形），在sidebar中点击“SSH keys”，接着点击“Add SSH key”，在"title"栏输入一个自己喜欢的标题，“key”栏中粘贴刚刚复制的公钥内容，最后点击“Add key”按钮。

第四步：检查SSH key是否成功设置
``` cmd
$ ssh -T git@github.com
# Attempts to ssh to GitHub
```
可能会看到如下的警告：
``` cmd
The authenticity of host 'github.com (207.97.227.239)' can't be established.
# RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
# Are you sure you want to continue connecting (yes/no)?
```
输入“yes”，如果得到下面的结果，说明你的设置是成功的！
``` cmd
Hi username! You've successfully authenticated, but GitHub does not
# provide shell access.
```

## 关于git提交 ##

添加到本地仓库
```cmd
git add .
```

添加提交描述
```cmd
git commit -m '内容'
```

提交前先从远程仓库主分支中拉取请求
```cmd
git pull origin master
```

把本地仓库代码提交
```cmd
git push -u origin master
```
