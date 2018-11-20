---
title: SQL基础 - 增删改查
date: 2016-11-21 10:20:40
categories: PHP
tags: [PHP, SQL]
cover: http://ojpb4w81b.bkt.clouddn.com/18-1-14/30008139.jpg


author: 
  nick: Joe
  link: https://www.github.com/Joe0708
---

## 1、增加记录
	语法格式: insert into table_name(field 1,field2, field3,...) values(value 1,value 2, value 3,...)
	语法说明: 
		* insert into : 添加数据的SQL命令.
		* table_name : 要添加数据的数据表名.
		* 表的字段列表, 要与值的列表一一对应.
		* 字段的类型,要与值类型一致.
		* 如果还有没列出的字段, 将用默认值代替.
	举例:
		insert into student(name, gender, profile) values ('Joe',1,'大家好,我在学习SQL');
		
![](http://ww1.sinaimg.cn/large/65e4f1e6gw1f9ylprvw7tj20vk09swgb.jpg)

## 2、删除记录
	语法格式: delete from table_name [where 条件]
	语法说明:
		* delete from : 删除数据的SQL命令.
		* table_name : 要删除数据的数据表名.
		* where 条件 : 如果省略条件, 将删除所有记录.
	举例: 
		* delete from student : //删除所有记录
		* delete from student where id>10; //删除 id>10 的所有记录
		* delete from student where id>19 and id<20; //删除 id>10 并且 id<20 的所有记录
		* delete from student where name='Joe' and id<100; //删除 name='Joe' 并且 id<100的所有记录

![](http://ww2.sinaimg.cn/large/65e4f1e6gw1f9ylz8r2d0j20kg0fk777.jpg)


## 3、修改记录
	语法格式: update table_name set 字段1=新值1, 字段2=新值2,... [where 条件]
	语法说明:
		* 需要更新的字段列出, 不需要更新的不用管.
		* 字段的顺序可以修改.
		* where 条件不能省略, 如果省略会导致所有记录都会修改成一样
	举例:
![](http://ww1.sinaimg.cn/large/65e4f1e6gw1f9ym5mralqj20to08m761.jpg)
	
## 4、查询记录
	语法格式: select 字段列表 | * from table_name [where 条件] [order by 排序] [limit 限制条数]
	语法说明:
		* 字段列表 : 查询某些字段的数据, 各字段之间用逗号隔开, 字段之间不分顺序
		* '*' : 表示显示所有列数据 如: select * from student;
		* where : 查询指定的条件的数据
			- select * from student where id<10;
			- select * from student where id<100 and gender=1;
			- select * from student where id=100 or gender=0;
		* order by : 字段排序
			- 语法 : order by 字段 [asc | desc].
			- asc 表示 "升序" 排列(默认), desc 表示 "降序"排列.
			- select * from student order by id desc; //id 降序排列
		* limit : 限制输出
			- 语法 : limit startrow,pagesize
			- 参数 : 
				* startrow 从指定的行数起开发返回数据.
				* pagesize 返回的记录数
			- 举例 :
				* limit 0,10; //从第0行起,返回10条记录
				* limit 10,10; //从第10行起,返回10条记录
				* limot 20,10; //从第20行起,返回10条记录 

	
| 运算符  | 名称  | 应用 |
|:------------- |:---------------:| -------------:| -------------:|
| = | 等于 | id=3 |
| > | 大于 | id>5 |
| < | 小于 | id<5 |
| >= | 大于等于 | id>=5 |
| <= | 小于等于 | id<=5 |
| !=或者<> | 不等于 | id!=5 |
| is not null | 不为空 | id is not null |
| is null | 为空 | title is null | 
| bwtween | 两者之间| id between 1 and 10 |
| in |  | id in(1,3,5) |
| not in | | id not in(1,3,5) |
| like | 模式匹配 | name like('jerry%') |
| not like | 模式匹配 | name not like('jerry%');
 	