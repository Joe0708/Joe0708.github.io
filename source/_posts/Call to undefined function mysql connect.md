---
title: Call to undefined function mysql_connect()
date: 2016-11-21 10:23:16
categories: PHP
tags: [PHP, MySQL]
cover: http://ww2.sinaimg.cn/large/65e4f1e6gw1f9yr3mp2j6j20jc0f6ab5.jpg


author: 
  nick: Joe
  link: https://www.github.com/Joe0708
---



今天学习PHP连接mysql,对着教程练习,代码什么都没问题,但是总无法连接成功,提示调用了未定义的函数,错误如下:

```
Call to undefined function mysql_connect()
```

网上胡乱搜了一番, 都是说**PHP.ini**文件配置问题.

SO, 屁颠屁颠的去找这个文件按照网上的答案改什么 **extension_dir**, 放开**extension=php_mysql.dll**的注释, Command + F ,结果啥也没搜到, WTF(黑人脸).这下懵逼了.

因为用的是Mac电脑,所以以为是系统原因导致配置文件的格式不一样? 结果又搜索了一番, 还是无果.机智如我,最后看了文档手册才发现**PHP7**已经废掉了mysql模块,官方推荐使用**mysqli**和**PDO**, 最后使用了最新模块顺利解决问题!

oh yeah~

![](http://ww2.sinaimg.cn/large/65e4f1e6gw1f9yr3mp2j6j20jc0f6ab5.jpg)
![](http://ww1.sinaimg.cn/large/65e4f1e6gw1f9yr51f501j20om05aq3a.jpg)