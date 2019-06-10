# 一镜到底
####现状：
动画的控制顺序貌似都是通过delay来实现的，由timeline加入到0位置。
####改善：
animation按顺序定义并打上label，每个animation再设置需要插入对应的label
[`.addLabel()`](https://greensock.com/docs/TimelineMax/addLabel()) 

