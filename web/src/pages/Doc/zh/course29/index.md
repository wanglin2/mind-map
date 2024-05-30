# 局域网docker部署解决HTTPS问题的一种方法

> 本文来自：[Brzjomo](https://github.com/Brzjomo)的[issue](https://github.com/wanglin2/mind-map/issues/658)。

受Api的限制，MindMap以HTTP访问时，目录、新建和打开功能不能正常工作。因此在局域网架设时，需要给它进行配置证书等操作，使其正常工作。

假设先前已经基于Github源码，架设了MindMap的docker服务。没有的先看这个[Issue](https://github.com/wanglin2/mind-map/issues/309)

事前准备：
需要准备一个域名。

需要安装Linux 服务器运维管理面板[1panel](https://github.com/1Panel-dev/1Panel)

设置域名解析：
以阿里云为例，登录后进入[域名解析页面](https://dns.console.aliyun.com/#/dns/domainList)

点击对应域名的解析设置。

添加或编辑对应的@和www记录，将IP记录值修改为局域网IP，比如192.168.2.36。

保存后退出。

获取AccessKey：
进入账号下面的AccessKey管理。

创建或者使用已经记录的AccessKey。

1panel设置：
进入应用商店，安装OpenResty（稍后用于申请证书和设置反代）。

进入网站-网站，点击创建网站。

点击反向代理。

设置主域名为自己的域名。

代理地址为http和127.0.0.1:MindMap容器端口。

点击确认。

创建证书申请账户：
进入1panel的网站-证书，点击Acme 账户。

点击创建账户。

输入邮箱后确认。

回到刚才的证书页面，点击DNS 账户。

点击创建账户。

填写名称后，选择类型为阿里云DNS。

再填入刚才准备好的Access Key和Secret Key。

点击确认。

申请证书：
回到刚才的证书页面，点击申请证书。

填写主域名，其他按实际情况填写。一般会自动设置。

点击确认，等待其成功。

启用HTTPS访问：
回到1panel的网站管理页面。

找到刚才建立的反向代理，点击配置。

点击HTTPS。

点击启用HTTPS。

SSL 选项设置为选择已有证书。

选择好刚才创建的Acme账户和证书。

点击保存。

此时，在局域网内访问该域名，应当能正确以Https访问MindMap了。

如果不能，输入host 域名，查看返回的DNS解析是否为局域网IP。