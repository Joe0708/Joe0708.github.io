---
title: '解决 macOS Sierra(10.12) 安全与隐私没有允许任何来源的选项 '
date: 2016-09-22 13:37:32
categories: macOS
tags: [macOS]
cover: http://ww2.sinaimg.cn/large/65e4f1e6gw1f82bpp0eovj20lo0i6dh5.jpg


author: 
  nick: Joe
  link: https://www.github.com/Joe0708
---


不少用户更新到最新系统 **macOS Sierra** 后发现系统偏好设置->安全性与隐私中默认已经隐藏了运行安装任何来源App的选项, 如图
![image](http://ww3.sinaimg.cn/large/65e4f1e6gw1f82boff8etj20g40di3z6.jpg)

因为增强了GateKeeper的安全性，所以该选项被隐藏，目的在于避免除Mac AppStore和正规签名外的未知或未签名App在系统内被任意执行，从而威胁用户隐私和系统安全。但这也导致很多不是从AppStore中下载的软件或破解版的软件将无法使用, 这也造成了很多不便。在**macOS Sierra**系统中**GateKeeper** 默认是打开的, 所以我们只需关掉**GateKeeper**即可看到**任何来源**的选项了


### 解决方法：

1.打开应用程序->实用工具->终端

![image](http://ww1.sinaimg.cn/large/65e4f1e6gw1f82bc2itoyj20oi0f8jtp.jpg)

2.在终端中输入命令 


```
sudo spctl --master-disable
```



3.敲回车, 然后验证口令后即可(电脑密码, 注意:输入密码时屏幕上不会有任何显示,实际已经输入,输入完后敲回车即可)。

![image](http://ww3.sinaimg.cn/large/65e4f1e6gw1f82bqnrca6j20i60ci74l.jpg)






![image](http://ww2.sinaimg.cn/large/65e4f1e6gw1f82bpp0eovj20lo0i6dh5.jpg)





### 其他

如果你不想打开这个全局设置, 你也可以针对某个应用开启选项

同上操作,输入命令时换成以下命令
```
sudo xattr -rd com.apple.quarantine /Applications/应用.app
```

注意 "应用.app" 换成你需要解锁的app, 例如QQ的安装路径是 /Applications/QQ.app 
```
sudo xattr -rd com.apple.quarantine /Applications/QQ.app 
```





如果不会操作可以下载这个命令行脚本, 解压后打开运行直接输入电脑密码即可
>链接: https://pan.baidu.com/s/1qXE9vEs 密码: 7rwq



### 参考链接

[Apple](https://support.apple.com/zh-cn/HT202491)
