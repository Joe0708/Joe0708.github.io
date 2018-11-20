---
title: 使用 Nginx 和 Supervisor 部署 Vapor 应用程序
author:
  nick: Joe
  link: 'https://www.github.com/Joe0708'
date: 2018-07-11 17:03:35
subtitle: 
tags: [Vapor]
cover: http://ojpb4w81b.bkt.clouddn.com/18-7-13/86747830.jpg
---


## 一、安装 Vapor、Swift

#### 添加 API Repo
```
$ eval "$(curl -sL https://apt.vapor.sh)"
```

#### 安装 Vapor
```
$ sudo apt-get install swift vapor
```

#### 验证安装结果

输入以下命令

```
$ swift --version
```

您应该会看到类似下面的输出:

```
Swift version 4.1 (swift-4.1-RELEASE)
Target: x86_64-unknown-linux-gnu
```

## 二、创建一个最基本的 Vapor 项目

使用以下命令创建一个默认基于 API 模版的项目

```
$ vapor new Hello
```

等待创建完成，进入该目录

```
$ cd Hello
```

编译

```
$ vapor build
```

运行

```
$ vapor run serve
```

如无意外，访问 **http://localhost/hello** 将会显示 "hello world".


## 三、安装并设置 Nginx

#### 安装

通过运行以下命令安装 Nginx：

```
$ sudo apt-get update 
$ sudo apt-get install nginx
```

通过从浏览器向服务器的域名或 IP 发送GET请求来检查 nginx是否设置正确。如果您看到下面的欢迎页面，则表示您已成功设置Nginx。

![](http://ojpb4w81b.bkt.clouddn.com/18-7-11/82908135.jpg)

#### 配置

修改 Nginx 配置信息以将请求转发到 Vapor 来处理

更改默认的配置文件

```
/etc/nignx/sites-available/default
```
修改成下面这样。
> 在开始前，建议您将默认配置文件备份一份，以防止错误。


```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /home/ubuntu/v2erBackend/Public/; 

	try_files $uri @proxy;

	location @proxy {
		proxy_pass http://127.0.0.1:8080;
	    proxy_pass_header Server;
	    proxy_set_header Host $host;
	    proxy_set_header X-Real-IP $remote_addr;
	    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	    proxy_pass_header Server;
	    proxy_connect_timeout 3s;
	    proxy_read_timeout 10s;
	}
}

```

#### 运行

运行 Nginx 服务器，测试是否转发成功

```
$ sudo service nginx restart
$ cd /home/ubuntu/Hello   # 创建的 Vapor 项目路径
$ vapor build
$ vapor run serve

```

通过浏览器访问 **http://YourDomainOrIPAddress/hello** ，如果正常，它将会显示 "hello world".

到这里我们已经正常部署项目，但是有一个问题，如果我们按 **Ctrl-C** 或 关闭运行服务器的终端窗口，它将停止工作。我们希望关闭当前会话服务也能正常运行，所以我们需要 **Supervisor** 协助我们管理进程通过后台来运行。


## 四、安装并设置 Supervisor

#### 通过运行以下命令安装 Supervisor：

```
$ sudo apt-get update 
$ sudo apt-get install supervisor
```

supervisor 配置需要放在 **/etc/supervisor/conf.d/** 目录下，以我们之前的项目 **Hello** 为例，在 **/etc/supervisor/conf.d/** 目录下创建一个 **hello.conf** 文件，输入以下配置信息

```
[program:hello] # hello 即程序名称
command=vapor run serve
directory=/home/ubuntu/Hello # 项目路径
user=ubuntu # 脚本运行的用户身份 
stdout_logfile=/var/log/supervisor/%(program_name)-stdout.log
stderr_logfile=/var/log/supervisor/%(program_name)-stderr.log
```

#### 加载配置文件并使用 Supervisor 在后台运行 **hello**。

```
$ sudo supervisorctl reread 
$ sudo supervisorctl add hello 
$ sudo supervisorctl start hello
```

如无意外，现在你可以关闭终端，通过浏览器访问 **http://YourDomainOrIPAddress/hello** ，它将会显示 "hello world".

#### 相关命令：

查看所有子进程的状态：

```
$ sudo supervisorctl status
```

关闭、开启所有的子进程：

```
$ sudo supervisorctl stop all

$ sudo supervisorctl start all

```

更新配置：

```
$ sudo supervisorctl update
```

Enjoy 😊
