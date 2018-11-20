---
title: UITableView 性能优化
date: 2016-09-12 11:37:59
categories: iOS
tags: [iOS, UITableView]
cover: http://ojpb4w81b.bkt.clouddn.com/18-1-14/35279138.jpg


author: 
  nick: Joe
  link: https://www.github.com/Joe0708
---



UITableView是iOS中使用最频繁的控件之一，平常使用过程中我们往往不会注意到其性能优化问题，只有当视图逻辑层次越来越复杂的时候，会导致列表的滑动不是那么流畅, 所有其性能优化也是常常要面对的，尤其是当数据量偏大并且设备性能不足时。那么当我们遇到这个问题时该如何下手呢，本篇文章主要总结和介绍UITableView的性能优化方法，其中一些优化方式是作者在开发中使用过的，有些是总结前人经验，在此总结UITableView的几个性能优化方式

### 首先我们分析总结一些影响UITableView性能的几个因素:
1. 多种类型cell及过于复杂的视图层级
2. cell的高度动态计算
3. 离屏渲染
4. 按需加载
5. ...



#### 1.视图层级过于复杂

   由于APP业务越来越复杂分析Cell结构，TableView的视图层级可能越来越复杂，我们可能会用多个cell以应对我们的需求，但是这样也是导致性能下降的原因，所有我们尽可能的将相同内容的抽取到一种样式Cell中，这样就能保证UITbaleView要显示多少内容，真正创建出的Cell可能只比屏幕显示的Cell多一点。虽然Cell的’体积’可能会大点，但是因为Cell的数量不会很多，完全可以接受的。好处：

> 减少代码量，减少Nib文件的数量，统一一个Nib文件定义Cell，容易修改、维护

基于Cell的重用，真正运行时铺满屏幕所需的Cell数量大致是固定的，设为N个。所以如果如果只有一种Cell，那就是只有N个Cell的实例；但是如果有M种Cell，那么运行时最多可能会是“M x N = MN”个Cell的实例，虽然可能并不会占用太多内存，但是能少点不是更好吗。
   
，导致性能出现问题，我们在分析cell时，尽量去避免remove、addSubviews 视图, 而是根据逻辑设置视图的hidden隐藏(显示)。在用户快速滑动中，只是单纯的显示、隐藏subview比实时创建、删除要快得多。

#### 2.cell的高度动态计算
当cell的每一个cell的高度一样时, 我们可以通过简单的一行代码解决

```
self.tableView.rowHeight = 88;
```
但是如果我们每个cell的高度不一样时, 这时候就需要实现代理方法根据数据返回不一样的高度, 需要注意的是，实现了这个方法后，rowHeight的设置将无效。所以，这个方法适用于具有多种cell高度的UITableView, 行高一样的情况建议你使用前者性能更好。

```
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    // return xxx
}
```

但是这样我们cell将要出现在屏幕的时候，系统都会去计算cell的高度。导致性能低下，如果说我能通过某种手段，在首次计算的时候，将每个cell对应的高度保存下载，当下次需要用到cell高度的时候再从保存的地方取出，从而减少了计算量，来达到优化的目的。
因此应运而生了这套高度缓存的算法的第三方库[UITableView-FDTemplateLayoutCell](https://github.com/forkingdog/UITableView-FDTemplateLayoutCell)

通过第三库在 tableView: heightForRowAtIndexPath: 代理方法中调用以下三个方法之一完成高度获取，从而提高APP性能：*

```
/*
   identifier 即 cell 的 identifier；
   configuration block 中的代码应与数据源方法 tableView: cellForRowAtIndexPath: 中对 cell 的设置代码相同
   方法内部将根据以上两个参数创建与 cell 对应的 template layout cell，这个 cell 只进行高度计算，不会显示到屏幕上
*/
 
 
// 返回计算好的高度(无缓存)
- (CGFloat)fd_heightForCellWithIdentifier:(NSString *)identifierconfiguration:(void (^)(idcell))configuration;
 
 
// 返回计算好的高度，并根据 indexPath 内部创建与之相应的二维数组缓存高度
- (CGFloat)fd_heightForCellWithIdentifier:(NSString *)identifiercacheByIndexPath:(NSIndexPath *)indexPathconfiguration:(void (^)(idcell))configuration;
 
 
// 返回计算好的高度，内部创建一个字典缓存高度并由使用者指定 key
- (CGFloat)fd_heightForCellWithIdentifier:(NSString *)identifiercacheByKey:(id<NSCopying>)keyconfiguration:(void (^)(idcell))configuration;
 
 ```
 
 
### 3.离屏渲染
#### GPU渲染机制：

CPU 计算好显示内容提交到 GPU，GPU 渲染完成后将渲染结果放入帧缓冲区，随后视频控制器会按照 VSync 信号逐行读取帧缓冲区的数据，经过可能的数模转换传递给显示器显示。

#### GPU屏幕渲染有以下两种方式：


1. On-Screen Rendering  意为当前屏幕渲染，指的是GPU的渲染操作是在当前用于显示的屏幕缓冲区中进行。
2. Off-Screen Rendering 意为离屏渲染，指的是GPU在当前屏幕缓冲区以外新开辟一个缓冲区进行渲染操作。
>   离屏渲染，指的是GPU在当前屏幕缓冲区以外新开辟一个缓冲区进行渲染操作。由上面的一个结论视图和圆角的大小对帧率并没有什么卵影响，数量才是伤害的核心输出啊。可以知道离屏渲染耗时是发生在离屏这个动作上面，而不是渲染。为什么离屏这么耗时？原因主要有创建缓冲区和上下文切换。创建新的缓冲区代价都不算大，付出最大代价的是上下文切换。


#### 离屏渲染的触发方式

设置了以下属性时，都会触发离屏绘

1. cornerRadius (圆角）
2. masks（遮罩）
3. shadows（阴影）
4. group opacity（不透明）
5. ...


#### 上下文切换
上下文切换，不管是在GPU渲染过程中，还是一直所熟悉的进程切换，上下文切换在哪里都是一个相当耗时的操作。首先我要保存当前屏幕渲染环境，然后切换到一个新的绘制环境，申请绘制资源，初始化环境，然后开始一个绘制，绘制完毕后销毁这个绘制环境，如需要切换到On-Screen Rendering或者再开始一个新的离屏渲染重复之前的操作。 下图描述了一次mask的渲染操作。


一次mask发生了两次离屏渲染和一次主屏渲染。即使忽略昂贵的上下文切换，一次mask需要渲染三次才能在屏幕上显示，这已经是普通视图显示3陪耗时，若再加上下文环境切换，一次mask就是普通渲染的30倍以上耗时操作。问我这个30倍以上这个数据怎么的出来的？当我在cell的UIImageView的实例增加到150个，并去掉圆角的时候，帧数才跌至28帧每秒。虽然不是甚准确，但至少反映mask这个耗时是无mask操作的耗时的数十倍的。



那么如何应对这个问题呢？不要在滚动视图使用cornerRadius或者mask。如果你一定要怎么办呢？那么这样也可以拯救你：

```

self.layer.shouldRasterize = YES;  

self.layer.rasterizationScale = [UIScreen mainScreen].scale;
```
这样大部分情况下可以马上挽救你的帧数在55帧每秒以上。shouldRasterize = YES会使视图渲染内容被缓存起来，下次绘制的时候可以直接显示缓存，当然要在视图内容不改变的情况下，对于复制的视图层次并不建议你这样做。

还是采取预先生成圆角图片，并缓存起来这个方法才是比较好的手段。预处理圆角图片可以在后台处理，处理完毕后缓存起来，再在主线程显示，这就避免了不必要的离屏渲染了。

另外也有在图片上面覆盖一个镂空圆形图片的方法可以实现圆形头像效果，这个也是极为高效的方法。缺点就是对视图的背景有要求，单色背景效果就最为理想。

#### 4.按需加载
   开发的过程中，自定义Cell的种类千奇百怪，但Cell本来就是用来显示数据的，不说100%带有图片，也差不多，这个时候就要考虑，下滑的过程中可能会有点卡顿，尤其网络不好的时候，异步加载图片是个程序员都会想到，但是如果给每个循环对象都加上异步加载，开启的线程太多，一样会卡顿。这个时候利用UIScrollViewDelegate两个代理方法就能很好地解决这个问题。
   
   ```
- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView

```

   思想就是识别UITableView禁止或者减速滑动结束的时候，进行异步加载图片，快滑动过程中，只加载目标范围内的Cell，这样按需加载，极大的提高流畅度。而SDWebImage可以实现异步加载，与这条性能配合就完美了，尤其是大量图片展示的时候。而且也不用担心图片缓存会造成内存警告的问题。
  
```
     //获取可见部分的Cell
NSArray *visiblePaths = [self.tableView indexPathsForVisibleRows];
        for (NSIndexPath *indexPath in visiblePaths)
        {
        //获取的dataSource里面的对象，并且判断加载完成的不需要再次异步加载
             <code>
        }
```

   记得在记得在“tableView:cellForRowAtIndexPath:”方法中加入判断：


```
// tableView 停止滑动的时候异步加载图片
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath

         if (self.tableView.dragging == NO && self.tableView.decelerating == NO)
            {
               //开始异步加载图片
                <code>
            }

```
  
  
        
        

#### 最后对性能优化的几点建议
- 提前计算并缓存好高度（布局），因为heightForRowAtIndexPath:是调用最频繁的方法；(这个是开发中肯定会要优化的，不可能一个app就几个Cell吧)
- 滑动时按需加载，防止卡顿，这个我也认为是很有必要做的性能优化，配合SDWebImage
- 异步绘制，遇到复杂界面，遇到性能瓶颈时，可能就是突破口（如题，遇到复杂的界面，可以从这入手）
- 缓存一切可以缓存的，这个在开发的时候，往往是性能优化最多的方向
- “真机测试，而不是模拟器”