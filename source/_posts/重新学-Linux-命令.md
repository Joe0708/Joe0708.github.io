---
title: 重新学 Linux 命令
author:
  nick: Joe
  link: 'https://www.github.com/Joe0708'
date: 2018-01-5 22:08:52
subtitle:
tags: [Linux]
cover: http://ojpb4w81b.bkt.clouddn.com/18-1-15/74981402.jpg
---


#### ls
options

* -a  显示隐藏文件
* -l  以列表显示当前目录的文件
* -h  以可读方式显示文件大小


#### man command | command --help
显示 command 的帮助信息


#### history
显示之前执行的历史命令  
!index 直接执行指定索引的历史命令


#### more filename
与 cat 不同的是显示一屏内容 按 f\b(上一页\下一页)内容


#### command > filename
重定向到指定文件

#### command >> filename
以追加的形式重定向到指定文件


#### cd 
* cd -  跳转到上一次的路径
* cd ~  跳转到home目录
* cd .. 当前目录的上一个目录
* cd ../.. 当前目录的上一个目录的上一个目录, 可以无限类推


#### -r
递归

#### -p
强制删除

#### ln
带参数 -s 创建软链接, 不到参数即硬链接


#### grep
从文件中的查找指定内容
-v 不包含指定搜索内容的内容
-n 显示行号


#### find
find path "query"
-name 以文件名搜索
-size 按大小搜索
-perm 按权限


#### tar
对文件打包
tar [参数] 打包文件名 文件
-c 生成档案文件,创建打包文件
-v 显示详细过程和进度
-f 指定档案文件名称
-t 列出档案中所有文件
-x 解开档案文件
-z 压缩/解压 .gz 后缀压缩文件
-j 压缩/解压 .bz2 后缀压缩文件



#### which
查找指定命令所在的目录


#### ps
查看进程信息, 默认只查看当前程序的进程信息
-aux 查看所有进程



#### whoami
查看当前用户


#### useradd
添加用户

#### userdel
删除用户
-r 删除用户时同时删除用户主目录

#### passwd
设置/修改 用户密码

#### groudadd
创建用户组

#### groupdell
删除用户组

#### groupmod
查看所有用户组

#### usermod 
sudo usermod -a -G 组名 用户名
-a 添加到用户组
-G 组名


#### who
查看当前登录用户


#### chown
chown 组名 文件名
修改文件所有者


#### chgrp
chgrp 组名 文件名
修改文件所属组


##### chmod
修改文件权限
