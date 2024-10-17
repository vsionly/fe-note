1、设置分支关联 
     git branch --set-upstream-to=origin/dev dev
     
   如果你的本地分支名和远程分支名一致，可以简写为。这里的-u是--set-upstream-to的简写形式。
     git branch -u origin/my-branch

2、拉取远程分支 git fetch origin 分支名
3、如果本地新建了一个分支 branch_name，但是在远程没有 git push --set-upstream origin branch_name


### Git 命令
```git
    git branch --set-upstream master origin/master 将本地的master分支跟远程的 master 关联
```

#### 如果您不希望 Git 跟踪某个文件的变化，但又不想将文件添加到 .gitignore 文件中
  git update-index --assume-unchanged path/to/file.txt
  或者 
  git update-index --skip-worktree   保留文件的版本历史

  恢复  
  git update-index --no-assume-unchanged path/to/file.txt
  git update-index --no-skip-worktree path/to/file.txt

### 代码中的换行符

    /*
    *  跨系统开发的换行符
    *  Windows 、unix 、linux 的断行
    *  Windows/Dos的是 CRLF \r\n  Linux/Unix是LF \n    MacOS 是CR \r
    */
       统一配置为unix的换行
       修改git配置 在拉取代码时 不转换断行符git config --global core.autocrlf false
       编辑器也要修改为unix
       TortoiseGit 修改配置文件 core下面的autocrlf = false