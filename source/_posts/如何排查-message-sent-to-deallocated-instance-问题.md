---
title: 如何排查 message sent to deallocated instance 问题
date: 2016-09-06 10:04:10
categories: iOS
tags: [iOS]


author: 
  nick: Joe
  link: https://www.github.com/Joe0708
---
对于开发者来说, 遇到这种问题是很难排查的, 没有堆栈信息, 不知从和查起,今天项目过程中遇到这个问题,脑袋那个头大. 不过最后还是在网上找到的排查方案,在这里做个笔记

>编译器环境:Xcode 7.3.2

>运行环境  : 模拟器 (貌似真机不支持, 没试过)

当我们的对象被销毁时, 再发送消息就会导致野指针错误, 而控制台也没有任何输入, 如下提示

![image](http://7xqmjb.com1.z0.glb.clouddn.com/52656420313-35e08fe121255270.jpg)


遇到这种问题, 会一头雾水不知如何解决,别急,下面跟着我一步步排查问题

首页我们打开Xcode的僵尸对象(Zombie Objects), 点击我们的项目并选择 "Edit Scheme..." ,如图

![image](http://7xqmjb.com1.z0.glb.clouddn.com/1525420313-b50cb26e90aa22a4.jpg)


然后点击 Diagnostics, 勾选 Enable Zombie Objects ,如图

![image](http://7xqmjb.com1.z0.glb.clouddn.com/147312764359081.jpg?imageView2/0/format/jpg)


重新运行项目,重现刚才导致野指针的的问题,现在奔溃时控制台就会有一条奔溃信息

![image](http://7xqmjb.com1.z0.glb.clouddn.com/147312767036825.jpg?imageView2/0/format/jpg)


但是得到这个, 我们还是没法排查问题, 别急, 我们先把上图中的内存地址存起来 , 也就是 : 0x7f8ed30bedd0

我们打开系统自带的活动监视器, 并在搜索按钮中输入您的项目名称,例如我的叫 "naL", 那我就搜索 "nal", 我们会得到一条进程,我们需要其中的 "PID" 信息

![image](http://7xqmjb.com1.z0.glb.clouddn.com/14731276998473.jpg?imageView2/0/format/jpg)


现在我们得到如下信息

>进程ID：31029
>
崩溃地址：0x7f8ed30bedd0

接下来我们打开终端，输入以下命令：

>sudo malloc_history 31029 0x7f8ed30bedd0


![image](http://7xqmjb.com1.z0.glb.clouddn.com/147312778931138.jpg?imageView2/0/format/jpg)


图中红色划线的地方就是最后调用导致奔溃的地方,我们根据这个线索就可以查到问题根源