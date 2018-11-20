---
title: 为自己的开源库添加对CocoaPods的支持
date: 2016-09-07 09:34:00
categories: iOS
cover: http://ww3.sinaimg.cn/large/65e4f1e6gw1f7kskv007aj20j909et99.jpg
tags: [iOS, CocoaPods]


author: 
  nick: Joe
  link: https://www.github.com/Joe0708
  
---
作为iOS开发者, 我们常常会用到第三方开源库, 并利用CocoaPods管理第三方库,并且非常方便,简单的执行 `pod install` 命令即可将第三方库导入到我们的项目中

如果我们想将自己的开源库提供给别人用, 让别人也可以简单集成自己的开源库, 该如何做呢?
下面给大家演示如何将自己的开源库添加对CocoaPods的支持, 我将步骤分为三步:

1. 注册trunk
2. 配置 podspec 描述文件
3. 将 podspec 推送到 CocoaPods




<br /><br /><br /><br />
## 准备工作
trunk对CocoaPods的版本有要求, 需要保证CocoaPods在0.33及以上版本,你可以同过 `pod --version` 查看当前版本

![image](http://ww3.sinaimg.cn/large/65e4f1e6gw1f7ks9ps8fzj209i02a0ss.jpg)

如果您的版本低于0.33就需要通过gem命令更新CocoaPods;

```
 sudo gem install cocoapods
```

<br /><br /><br /><br /><br />
## 一、 注册trunk
打开终端输入以下命令

```
 pod trunk register 你的邮箱 '你的用户名'
```
![image](http://ww2.sinaimg.cn/large/65e4f1e6gw1f7ksgfah9qj20de01oq35.jpg)

等待命令执行完毕,CocoaPods会给你发送一封邮箱进行验证

![image](http://ww3.sinaimg.cn/large/65e4f1e6gw1f7ksi422w9j20e305j3yx.jpg)

复制邮件中的链接到浏览器中打开即可验证,出现如下提示就代表验证成功

![image](http://ww3.sinaimg.cn/large/65e4f1e6gw1f7kskv007aj20j909et99.jpg)

现在我们可以通过以下命令从终端查看自己的注册信息

```
pod trunk me
```

![image](http://ww1.sinaimg.cn/large/65e4f1e6gw1f7ksn4amzzj20eb06sgms.jpg)

至此代表你已经注册成功


   

   <br /><br /><br />
## 二、 配置 podspec 描述文件
podspec为Pods依赖库的描述文件, 每个Pods依赖库必须有切仅有一个描述文件, 文件名称必须和我们的开源库名称一致,该文件中描述的开源库的一样详细信息和依赖框架
<br /><br />
### 创建 podspec 文件
```
pod spec create 你的podspec文件的文件名(开源库的名称)
```

这样就生成了podspec文件，接下来就是需要编辑podspec文件里面的内容，打开文件会发现里面的内容很多, 很多都是我们不需要关心，我们只需要填写一些必须的内容即可, 你可以直接复制下面的podspec文件,改一些你自己相关的内容即可, 或者直接在github上找开源库,复制它的podspec信息即可

podspec文件：

```

Pod::Spec.new do |s|
  s.name         = "QCCountdownButton"
  s.version      = "1.0"
  s.summary      = "Countdown Button For iOS"
  s.homepage     = "https://github.com/Joe0708/QCCountdownButton"
  s.license      = "Copyright (c) 2016年 Joe. All rights reserved."
  s.author       = { "Joe" => "joesir7@foxmail.com" }
  s.platform     = :ios, "7.0"
  s.ios.deployment_target = "7.0"
  s.source       = { :git => "https://github.com/Joe0708/QCCountdownButton.git", :tag => s.version }
  s.source_files  = "QCCountdownButton/QCCountdownButton/*.*"
  s.requires_arc = true
  # s.frameworks = 'SomeFramework'
end


```
  
  >s.name 	开源库的名称
  
  >s.version 版本号
  
  >s.summary 库简介
  
  >s.homepage 库的主页
  
  >s.license 授权版本
  
  >s.author 库的作者
  
  >s.platform 支持的平台
  
  >s.ios.deployment_target 最低支持系统
  
  >s.source 源代码链接
  
  >s.source_files 库的源代码位置
  
  >s.requires_arc 是否ARC
  
  >s.frameworks 开源库中依赖的其他库(如果你有依  赖其他库, 需要在这里声明, 如果没有可忽略)
  
  
配置完podspec文件后, 我们需要对podspec文件进行验证其是否编写正确

```
pod spec lint 库名字.podspec
```

![image](http://ww4.sinaimg.cn/large/65e4f1e6gw1f7ktelxocoj20fw04xgmi.jpg)


你可能会遇到以下错误,提示找不到license文件,这个我们可以使用`--allow-warnings `命令进行忽略(`--verbose`查看详细信息)


```
pod spec lint 库名字.podspec --allow-warnings
```


看到`QCCountdownButton.podspec passed validation.`即代表验证通过

![image](http://ww4.sinaimg.cn/large/65e4f1e6gw1f7ktgtwlkzj20ft052gmd.jpg)


<br />
<br /><br />
## 三、 将 podspec 推送到 CocoaPods
podspec验证通过后, 我们就可以将 podspec 推送到 CocoaPods

```
pod trunk push QCCountdownButton.podspec
```

最后我们可以通过 `pod search 库名称` 来查找自己的开源库

![image](http://ww3.sinaimg.cn/large/65e4f1e6gw1f7ktm43594j20fk040wf2.jpg)

至此开源库已经上传至CocoaPods, 别人可以直接通过CocoaPods安装你的开源库

如果`pod search`无法搜索到自己的库,可以执行`pod setup`命令进行更新

<br />
<br />
<br />
## 最后
<br />
开源库发布之后, 我们需要给开源库打上tag, tag和podspec文件中的tag保持一致,否则会提示找不到对应的库
顺便为自己的开源库打个广告 [QCCountdownButton](https://github.com/Joe0708/QCCountdownButton)
