## 在使用SignalR，并使用Nginx 做反向代理时，需添加对websocket的配置
```
 //在nginx.conf中，html节点下添加
map $http_upgrade $connection_upgrade {
            default upgrade;
            ''      close;
    }
server {
        #监听端口为 80
        listen 80;
        
        #设置主机域名
        #server_name  192.168.1.100;
        
        #设置访问的语言编码
        #charset koi8-r;

        #设置虚拟主机访问日志的存放路径及日志的格式为main
        #access_log  logs/host.access.log  main;

        #设置虚拟主机的基本信息
        location / {
            #设置虚拟主机的网站根目录        
            proxy_pass   http://localhost:5000;
           
            proxy_http_version 1.1;         //重点
            proxy_read_timeout 4d;	        //重点
	        proxy_set_header Upgrade $http_upgrade; //重点
	        proxy_set_header Connection $connection_upgrade;//重点
        } 
```
