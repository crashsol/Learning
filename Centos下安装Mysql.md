#  添加并下载存储可以
在撰写本文时，最新版本的MySQL是8.0版本。 按照以下步骤安装它：

1.下载并添加存储库
```
sudo yum localinstall https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm
```
2.与其他使用yum的软件包一样安装MySQL：
```
 sudo yum install mysql-comm
```

3.启动mysql
```
sudo systemctl enable mysqld
sudo systemctl start mysqld
#查看状态
sudo systemctl status mysqld
```
4.查看Mysql启动的临时密码
```
sudo grep 'temporary password' /var/log/mysqld.log

```
5.运行mysql_secure_installation命令来提高MySQL安装的安全性：
```
sudo mysql_secure_installation
```
6.根据提示修改，并配置先关内容

7.要通过终端与MySQL进行交互，我们将使用作为MySQL服务器软件包的依赖项安装的MySQL客户端。
以root用户类型登录到MySQL服务器：
```
mysql -u root -p
```
8.修改mysql配置运行root用户远程登录

```
-- 切换到 mysql DB
use mysql;
-- 查看现有用户,密码及允许连接的主机
select user password,host from user;
--修改root的host属性，允许非本机用户远程登录root
 UPDATE user SET Host='%' WHERE User='root' AND Host='localhost' LIMIT 1;
 flush privileges;
```

[查考链接](https://www.linuxidc.com/Linux/2018-05/152574.htm)