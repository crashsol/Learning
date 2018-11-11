# 创建文件夹,下载nginx文件,并解压文件
```
mkdir /home/geek
cd /home/geek
wget http://nginx.org/download/nginx-1.14.1.tar.gz
tar -xzf nginx-1.14.1.tar.gz
```
# 给Nginx 配置文件添加 Vim配置
```
mkdir ~/.vim
cp -r contrib/vim/* ~/.vim/
```
# 配置Nginx模块，选择默认配置，设置输出文件夹到/home/geek/nginx文件夹下
```
安装gcc 
yum install gcc
安装pcre库  
yum install pcre pcre-devel -y
安装zlib库
yuminstall -y zlib zlib-devel
安装 openssl
yuminstall -y openssl openssl-devels

编译nginx
./configure --prefix=/home/geek/nginx
```
# 上一步执行成功后，执行make编译
```
make
make install
```