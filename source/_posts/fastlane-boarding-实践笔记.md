---
title: fastlane boarding 实践笔记
author:
  nick: Joe
  link: 'https://www.github.com/Joe0708'
date: 2017-12-23 21:49:00
subtitle: 很长时间以来一直使用 腾讯问卷 来收集 TestFlight 邮箱, 然后按模板导出SVG再导入到  iTunes Connect 中邀请测试, 如果有新的申请又得再次操作, 如此反复实在浪费精力.以至于后来懒得处理申请. 
category: iOS
tags: [iOS, fastlane]
cover: http://ojpb4w81b.bkt.clouddn.com/18-1-15/5196198.jpg
---

### fastlane boarding 实践笔记

很长时间以来一直使用 [腾讯问卷](https://wj.qq.com/) 来收集 TestFlight 邮箱, 然后按模板导出SVG再导入到  iTunes Connect 中邀请测试, 如果有新的申请又得再次操作, 如此反复实在浪费精力.以至于后来懒得处理申请. 偶然发现 fastlane 自动化工具有个 [boarding](https://github.com/fastlane/boarding) 服务专门用来简化这个功能, 只需要开发配置一下, 之后可以自动邀请, 完全不需要手工干预.

[boarding Github](https://github.com/fastlane/boarding) Github上已经有详情的教程


#### 操作教程

1. 注册 [Heroku](https://www.heroku.com/) 账号
2. ![](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67) 部署到 Heroku
3. 如图, 填写App名称, iTunes Connect 账号、邮箱、报名, 其他配置可按需设置![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmr00td9i3j30jg0w80tu.jpg)
4. 点击 **Deploy app** 等待部署, 完成之后点击 **View** 即可

> boarding 会自动根据填写的 **App name** 生成一个二级域名, 并获取App图标和名称, 如图示
> 
>  ![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmr042vna5j30cg0lbdg1.jpg)


#### 可能遇到的问题
二步验证登录
> 如果设置**二步验证登录**, 可以按照此文件配置 [2-step-verification](https://github.com/fastlane/fastlane/blob/master/spaceship/README.md#2-step-verification) 

错误提示 "无默认外部组"
> 打开 Heroku App的配置页面, 点击 Setting -> Config Variables -> Reveal Config Vars, 添加一个配置变量, 如图示
>  ![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmr080qgd7j30z60bsaak.jpg)
