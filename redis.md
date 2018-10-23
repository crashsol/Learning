### CentOs下安装 Redis
- 1、安装最新的redis，需要安装Remi的软件源
```
   yum install -y http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
```
- 2、 安装最新版本的redis ,当遇见询问的时候输入y
```
  yum --enablerepo=remi install redis
```

- 3、 redis安装完毕后，我们来查看下redis安装时创建的相关文件
```
rpm -qa |grep redis
```

- 4、 将redis添加到服务自启动
```
  systemctl enable redis.service
```

- 5、配置远程访问和密码
```
在redis的配置文件/etc/redis.conf中

将bind 127.0.0.1 改成了 bind 0.0.0.0
设置requirepass 密码

然后要配置防火墙 开放端口6379

连接redis

```
- 6、 开放端口6379、6380的防火墙

```
/sbin/iptables -I INPUT -p tcp --dport 6379  -j ACCEPT   开启6379
/sbin/iptables -I INPUT -p tcp --dport 6380 -j ACCEPT  开启6380
```
### 直接通过docker运行redis
```
docker run --name redis -d -p 6379:6379 redis
```


- [centos7 yum install redis](https://www.cnblogs.com/autohome7390/p/6433956.html)
