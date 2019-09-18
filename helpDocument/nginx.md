# nginx 相关问题 #  

## 安装部分 ## 

参照[https://www.huaweicloud.com/kunpeng/software/nginx.html]

## 最基本的nginx.conf ##
``` conf
# user这一栏要去存放静态目录的文件下 执行 ll 查看该静态文件的用户和组信息，nginx必须配置一样才行
user root root
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    server_names_hash_max_size 512;
    server_names_hash_bucket_size 64;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers X-Requested-With;



    # another virtual host using mix of IP-, name-, and port-based configuration

    server {
        listen  80 default_server;
        # 下划线是默认通配符
        server_name  _;

        location / {
            # 波浪线指向的实际地址可以用 echo $HOME 查询
            # 所以 也可以写成 root /root/mine
            root    ~/mine; 
        }
    }
}
```

## 控制nginx ##
``` shell
    # 选配先删了在写
    rm /usr/local/nginx/conf/nginx.conf
    # 写nginx.conf
    vim /usr/local/nginx/conf/nginx.conf

    # 重启 nginx
    # 停止后启动
    /usr/local/nginx/sbin/nginx -s quit
    /usr/local/nginx/sbin/nginx 

    # 重新加载配置文件 nginx.conf
    /usr/local/nginx/sbin/nginx -s reload
```

## 问题 ##

### 排除 403 错误 ###

1. 看下nginx.conf的配置是否与静态文件所述文件的用户和配置一样  
2. 查看下777权限问题  
参照[https://www.jianshu.com/p/e0dadb871894]