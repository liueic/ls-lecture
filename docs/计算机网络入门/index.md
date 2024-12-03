# What happen when you type URL and enter?

大家经常会说自己知道如何使用电脑，但是很多人对电脑背后的运行的基础原理却一窍不通。浏览网页是我们日常上网的过程中最经常使用的场景，不知道你有没有想过，从你输入网址，到按下回车键的过程，浏览器的背后都发生了什么？

## URL解析

当你输入一个URL到浏览器中，比如这个URL是：`https://example.com`，浏览器就能凭借这个URL知道以下信息：

- **Protocol**:
    
    - **解释**: 指明使用的通信协议，例如 `http` 、 `https`、`FTP`、`File`等等，在之后我们将详细介绍`http`和`https`
    - **示例**:
        - URL: `http://example.com/`
        - **解析**: 使用的是 **HTTP 协议**。
- **Host**:
    
    - **解释**: 提供服务的主机地址，可以是域名（例如 `example.com`）或 IP 地址（例如 `192.168.1.1`）。
    - **示例**:
        - URL: `http://example.com/`
        - **解析**: 主机为 **example.com**。
- **Port**:
    
    - **解释**: 通信使用的端口号，默认为 80（HTTP）或 443（HTTPS）。如果 URL 中未指定端口，使用协议的默认端口。
    - **示例**:
        - URL: `http://example.com:8080/`
        - **解析**: 使用的是 **8080 端口**。
        - URL: `https://example.com/`
        - 解析：使用的是 **443端口**。
- **Path (Resource)**:
    
    - **解释**: 服务器上的具体资源路径，通常指文件、目录或应用接口。`/` 表示网站的根路径（主页）。
    - **示例**:
        - URL: `http://example.com/`
        - **解析**: 请求的资源是 **主页（根路径）**。
- **Query String**:
    
    - **解释**: `?` 后的参数，用于传递附加信息到服务器。
    - **示例**:
        - URL: `http://example.com/?key=value`
        - **解析**: 查询字符串为 **`key=value`**。
- **Fragment**:
    
    - **解释**: `#` 后的部分，表示文档的特定部分，通常用于导航到页面中的某一部分。
    - **示例**:
        - URL: `http://example.com/#section`
        - **解析**: 页面片段标识为 **`section`**。

现代的浏览器通常比较智能，如果你输入的东西并不符合上述URL的解析规则，那么他就会将你所输入的内容发送到默认的搜索引擎中，来帮助你搜索关键词

## 检查 HSTS 列表

我们用户在浏览器中最能直观接受到的协议应该是`http`和`https`。实际上`http`在实际传输的过程中并不安全，这在我们第二次“信息安全与开源软件”的讲座中已经叙述过了

- 浏览器检查自带的“预加载 HSTS（HTTP严格传输安全）”列表，这个列表里包含了那些请求浏览器只使用HTTPS进行连接的网站，如果网站在这个列表内，那么只会使用`https`协议进行连接

- 浏览器会自动把你输入的补全成 `https://github.com`（如果域名在 [HSTS preload list](https://hstspreload.org/?domain=github.com) 里，有些浏览器会补全成 `https://github.com`）。

在这里的`strict-transport-security`可以看得出是支持`HSTS`的，或者你也可以进入到[HSTS proload list](https://hstspreload.org/?domain=juniortree.com)中进行检查：

```zsh
(base) liueic-aicnal@HUAWEI-MateBook-Go-ARM ~ % curl -I https://juniortree.com

HTTP/2 200 
**accept-ranges**: bytes
**alt-svc**: h3=":443"; ma=2592000
**content-type**: text/html
**date**: Tue, 03 Dec 2024 02:48:37 GMT
**etag**: "66ba2098-7e1"
**last-modified**: Mon, 12 Aug 2024 14:47:52 GMT
**server**: Caddy
**server**: nginx/1.21.5
**strict-transport-security**: max-age=31536000; includeSubDomains; preload
**content-length**: 2017
```

![image](https://pic.juniortree.com/app/hide.php?key=YXE4cnhRb2MxbE14NFlIQk1WdUxaM3pjQmtEaHBnTnhsUT09)


- 如果网站不在这个列表内，那么首次连接将会使用`http`，如果是负责任的服务器，他会帮你把`http`请求重定向（308）到`https`去：

```bash
(base) liueic-aicnal@HUAWEI-MateBook-Go-ARM ~ % curl -i http://oneleaf.me  

HTTP/1.1 308 Permanent Redirect
**Date**: Mon, 02 Dec 2024 13:11:07 GMT
**Content-Length**: 0
**Connection**: keep-alive
**Location**: https://oneleaf.me/
```

[如何为我自己的站点开启HSTS？](如何为自己的站点开启HSTS)


## DNS查询

如何上面输入的URL为IP地址，诸如`10.10.10.9`这种，那么浏览器就不必要进行DNS，直接与该IP地址进行通信就可以了；但是如果上述的URL为域名，诸如`cnu.edu.cn`，那么浏览器就要进行DNS查询，去找到该域名所对应的IP地址


1. 浏览器缓存检测
	浏览器会首先检查自己缓存中的是否存在该域名的DNS解析记录（TTL未过期），对于Chrome浏览器，你可以通过`chrome://net-internals/#dns`来检查当前域名的缓存

2. 操作系统缓存
	如果浏览器中没有该缓存或者该缓存已经过期了，那么浏览器就会查询操作系统中的本地缓存或者`hosts`文件
	`hosts`文件本质上就是一个纯文本文件，里面存放了一些IP地址和其对应的域名，在Windows下的路径为：
	```
	C:\Windows\System32\drivers\etc\hosts
	```
	Linux/Unix/macOS：
	```
	/etc/hosts
	```
	其基本内容为：
	```
	127.0.0.1 localhost
	255.255.255.255 broadcasthost
	::1             localhost
	127.0.0.1 fuse-t
	```

	在操作系统的解析过程中，`hosts`文件的解析优先级是最高的，如果在`hosts`文件中找到匹配项，则不会再去进行操作系统内DNS缓存的查询

3. 本地DNS服务器
	如果本地缓存和`hosts`中都没有找到对应的解析结果或者此结果已过期，那么则向本地的DNS服务器（这通常是由路由器或者ISP（Internet service provider）提供的DNS服务器）发起请求
	我们可以使用`nslookup`来查看请求：
	
	```bash
	(base) liueic-aicnal@HUAWEI-MateBook-Go-ARM ~ % nslookup baidu.com

	Server: 202.204.208.2（中国–北京–北京教育网/首都师范大学）

	Address: 202.204.208.2#53

  

	Non-authoritative answer:

	Name: baidu.com

	Address: 110.242.68.66

	Name: baidu.com

	Address: 39.156.66.10	
	```

	可以看到这里的`Server`指的就是系统内默认的DNS服务器，我这里使用的是学校网关自动给我分配的DNS服务器，通常会分配两个地址，一个是`202.204.208.2`；另外一个是`202.204.208.3`

4. 递归查询
	如果我们所配置的本地DNS中也没有对应的解析结果，那么他会向上游的其他DNS服务器进行查询
	推荐阅读：[什么是递归DNS？| Cloudflare](https://www.cloudflare.com/zh-cn/learning/dns/what-is-recursive-dns/)
	

> [!CAUTION]
>  下面内容酌情阅读，如果影响了你的理解可以直接跳转到[tcp（传输控制协议）和udp（用户数据报协议）](#tcp-传输控制协议-和udp-用户数据报协议)

了解了上述DNS的查询过程，那我们可以尝试来查看更详细的DNS递归解析过程，在这里我尝试使用`dig +trace`和`WireShark`抓包的两种方法，来尝试帮助你更深度地了解DNS的解析

### `dig`查看DNS解析全过程

我们可以使用`dig +trace <domain>`来查看完整的递归查询过程：

<details>
	<summary>点我展开</summary> 
	```
	(base) liueic-aicnal@HUAWEI-MateBook-Go-ARM ~ % dig +trace github.com

	; <<>> DiG 9.10.6 <<>> +trace github.com

	;; global options: +cmd

	. 62254 IN NS b.root-servers.net.

	. 62254 IN NS h.root-servers.net.

	. 62254 IN NS j.root-servers.net.

	. 62254 IN NS l.root-servers.net.

	. 62254 IN NS e.root-servers.net.

	. 62254 IN NS k.root-servers.net.

	. 62254 IN NS g.root-servers.net.

	. 62254 IN NS f.root-servers.net.

	. 62254 IN NS i.root-servers.net.

	. 62254 IN NS m.root-servers.net.
	
	. 62254 IN NS d.root-servers.net.

	. 62254 IN NS a.root-servers.net.

	. 62254 IN NS c.root-servers.net.

	;; Received 767 bytes from 202.204.208.2#53(202.204.208.2) in 12 ms

  

	com. 172800 IN NS c.gtld-servers.net.

	com. 172800 IN NS i.gtld-servers.net.

	com. 172800 IN NS j.gtld-servers.net.

	com. 172800 IN NS h.gtld-servers.net.

	com. 172800 IN NS l.gtld-servers.net.

	com. 172800 IN NS d.gtld-servers.net.

	com. 172800 IN NS k.gtld-servers.net.

	com. 172800 IN NS e.gtld-servers.net.
	
	com. 172800 IN NS g.gtld-servers.net.

	com. 172800 IN NS m.gtld-servers.net.

	com. 172800 IN NS f.gtld-servers.net.

	com. 172800 IN NS b.gtld-servers.net.

	com. 172800 IN NS a.gtld-servers.net.

		com. 86400 IN DS 19718 13 2 

	;; Received 1170 bytes from 2001:500:1::53#53(h.root-servers.net) in 37 ms

  

	github.com. 172800 IN NS ns-520.awsdns-01.net.

	github.com. 172800 IN NS ns-421.awsdns-52.com.

	github.com. 172800 IN NS ns-1707.awsdns-21.co.uk.

	github.com. 172800 IN NS ns-1283.awsdns-32.org.

	github.com. 172800 IN NS dns1.p08.nsone.net.

	github.com. 172800 IN NS dns2.p08.nsone.net.

	github.com. 172800 IN NS dns3.p08.nsone.net.

	github.com. 172800 IN NS dns4.p08.nsone.net.

	;; Received 635 bytes from 2001:500:856e::30#53(d.gtld-servers.net) in 183 ms
	

	github.com. 60 IN A 20.205.243.166

	github.com. 900 IN NS dns1.p08.nsone.net.

	github.com. 900 IN NS dns2.p08.nsone.net.

	github.com. 900 IN NS dns3.p08.nsone.net.

	github.com. 900 IN NS dns4.p08.nsone.net.

	github.com. 900 IN NS ns-1283.awsdns-32.org.

	github.com. 900 IN NS ns-1707.awsdns-21.co.uk.

	github.com. 900 IN NS ns-421.awsdns-52.com.

	github.com. 900 IN NS ns-520.awsdns-01.net.
	. 59039 IN RRSIG NS 8 0 518400 20241212050000 20241129040000 61050 . zB82/LDAn3ihc1FwSwRTuwCuPqaWcBwhVaZ2kNMNv+jBI7GhurWJP1+0 0yts9uaQ5hPhRotPltntH+AWD5LxAshgKd68jHtW2mVaSPyOjyn7peEL a1aBnWSKlaaUFI2+/K0eiTqhtOXn90NLqWZo5NBrQmndEFBE21GiOeS5 rQXF3McjHVi26mO41rTeO2vARbDJO0DqRto+ZB9KX3YNB9M4WYZkxG9U NO3wlhYdf7R78p+yn/1u+WwAY+mF6XFlx0R7IgN1Al74ep2+mfeVfstZ l64dtRieRkU2HGm/Zs61RPTaiIocm2WYe/hxpCkKE5cQ2QRl58fFbn92 ohtuCg==
	
	;; Received 278 bytes from 2600:9000:5306:ab00::1#53(ns-1707.awsdns-21.co.uk) in 94 ms
	```
</details>

1. 根服务器查询：
	第一部分从本地的 DNS 服务器开始查询，并向 **根域名服务器** 请求顶级域 (TLD) `.com` 的权威服务器信息：
	```
	.         62254   IN    NS    a.root-servers.net.
	.         62254   IN    NS    b.root-servers.net.
	...
	;; Received 767 bytes from 202.204.208.2#53(202.204.208.2) in 12 ms
	```
	- 本地 DNS 服务器的地址为 `202.204.208.2`（中国–北京–北京教育网/首都师范大学），此时CNU网关把根域名服务器的地址返回给我们
	- 它返回了根服务器列表（如 `a.root-servers.net`、`b.root-servers.net` 等）

小思考：[如果大家都去查询根服务器，根服务器压力会不会比较大？根服务器在哪里呢？](根服务器)


2. 查询 `.com` 顶级域名服务器：
	接下来，从根服务器获取 `.com` 的权威名称服务器列表：
	```
	com.       172800   IN   NS   a.gtld-servers.net.
	com.       172800   IN   NS   b.gtld-servers.net.
	...
	;; Received 1170 bytes from 2001:500:1::53#53(h.root-servers.net) in 37 ms
	```
	- 我们查询的`.com`顶级域名服务器返回了一组权威服务器列表（`a.gtld-servers.net` 等）

3. 查询 GitHub 的权威名称服务器
	通过 `.com` 顶级域名服务器，获得 GitHub 的权威 DNS 服务器地址：
	```
	github.com.       172800   IN   NS   dns1.p08.nsone.net.
	github.com.       172800   IN   NS   ns-1283.awsdns-32.org.
	...
	;; Received 635 bytes from 2001:500:856e::30#53(d.gtld-servers.net) in 183 ms
	```
	- 此时返回了记录了GitHub的权威服务器：如 `dns1.p08.nsone.net` 和 `ns-1283.awsdns-32.org`，此时我们再去请求如 `dns1.p08.nsone.net` 和 `ns-1283.awsdns-32.org`就可以得到GitHub的最终地址了

4. 最终解析 GitHub 的 IP 地址
	通过权威 DNS 服务器，解析出 `github.com` 的实际 IP 地址：
	```
	github.com.       60   IN   A   20.205.243.166
	```
	- IP 地址 `20.205.243.166` 是 GitHub 的实际服务器地址。
	- 这是最终的解析结果。

通过以上的分析我们不难看出，DNS的解析是一个递归的过程，先找到最大的根服务器，之后根服务器告诉你需要去查询的二级服务器，之后二级服务器再告诉你去哪里找到你需要的域名服务器，最后再得到最终的解析结果

![image](https://pic.juniortree.com/app/hide.php?key=VEEwbGJaY0ZWQW56eUlFd1BmSytWQk02d3YrbmNWaGNVWUk9)

![image](https://pic.juniortree.com/app/hide.php?key=MHFraUlobG5sbk1JSUtFcTRTdTZwaE02d3YrbmNWaGNVWUk9)

> 图片来源于：[多张图带你彻底搞懂DNS域名解析过程 | 简书](https://juejin.cn/post/7065238621866950693)


### WireShark抓包

传统的DNS请求是使用UDP协议，53端口，在我们抓包的过程中也印证了这一点，我们实际上抓到了两个数据包：

![image](https://pic.juniortree.com/app/hide.php?key=MzU1MUd4Rzhyc3FlRXRoVGVxNXZCaE02d3YrbmNWaGNVWUk9)

一个是本机向服务器请求的数据包，在这里可以看到印证了我们所说的传统DNS使用53端口，UDP协议的特点，值得注意的是，基于 DNS over HTTPS（DoH）或者DNS over TLS（DoT）就不使用传统的 **53** 端口和UDP协议，而是使用 **443** 或者 **853** 端口

传统的使用 **53** 端口和UDP协议的DNS的传输过程是全明文的，在DNS的解析的每一个结果都有可能被监听或者篡改

下面的每一跳中的路由都有可能篡改你的解析结果，使你进入到错误的网站

推荐阅读[DNS劫持 | 卡巴斯基](https://www.kaspersky.com.cn/resource-center/definitions/what-is-dns-hijacking)

```bash
(base) liueic-aicnal@HUAWEI-MateBook-Go-ARM ~ % traceroute 1.1.1.1
traceroute to 1.1.1.1 (1.1.1.1), 64 hops max, 40 byte packets
 1  * * *
 2  <redacted>
 3  <redacted>
 4  <redacted>
 5  <redacted>
 ...
10  223.120.2.209 (223.120.2.209)  146.368 ms  98.243 ms  126.043 ms
11  223.118.4.105 (223.118.4.105)  117.717 ms
    223.118.4.101 (223.118.4.101)  111.705 ms
    223.118.4.105 (223.118.4.105)  97.162 ms
12  * 103.22.201.78 (103.22.201.78)  241.559 ms *
13  103.22.201.23 (103.22.201.23)  125.414 ms
    103.22.201.97 (103.22.201.97)  147.406 ms
    103.22.201.23 (103.22.201.23)  131.828 ms
14  one.one.one.one (1.1.1.1)  145.450 ms  95.510 ms  95.925 ms
```

![image](https://pic.juniortree.com/app/hide.php?key=UXR0cG9OeGhTSktCc2JmQXZJVFU4a3dzU2RmS0l3b1VJbVU9)


另外一个是服务器向本地发送DNS解析结果的数据包，这个数据包的大小比之前请求的数量大得多，这里就可以看到我们之前使用`dig`得到的内容

![image](https://pic.juniortree.com/app/hide.php?key=TDZVWVRUeGJmTmczVzJBaUVEbjBBa3dzU2RmS0l3b1VJbVU9)

## TCP（传输控制协议）和UDP（用户数据报协议）

在介绍下面的内容之前，我认为有必要向各位解释一下 **TCP** 和 **UDP** 之间的区别，这两种都是极为常用的数据传输协议，知乎上的这样两种图我觉得很形象：

![image](https://pic.juniortree.com/app/hide.php?key=OHoramExTDg3c09TZWN1a3dMV3JscFBlcUpKck1wbmRYQT09)

![image](https://pic.juniortree.com/app/hide.php?key=ZGp2a24vaUpIZUExUXc3VHFXa2dvWlBlcUpKck1wbmRYQT09)

**TCP**相较于**UDP**，多了三次握手，保证了数据传输的完整性，但也因此，**TCP**协议的传输速度不如**UDP**

在一些实时性要求比较高的应用场景，比如说游戏、视频通话中，使用**UDP**较多；而对于一些可靠性要求比较高的场景，比如说电子邮件、web浏览（http和https）协议则都是基于**TCP**

[TCP与UDP的详细对比](TCP与UDP对比)

## TCP的三次握手

浏览器通过得到的目标服务器IP地址，开始与服务器建立TCP连接。TCP三次握手的过程如下：

- 客户端向服务器发送一个SYN（同步）标志的数据包，表示请求建立连接。
- 服务器接收到后回应一个SYN+ACK（同步确认）标志的数据包，表示同意建立连接。
- 客户端再发送一个ACK（确认）标志的数据包，确认连接已建立。

![image](https://pic.juniortree.com/app/hide.php?key=TENoY3grc3I4L2F5Q2dIblBsaUpWT3BBU1NreHkvanRuUT09)

如果上面的理解过于抽象，你可以把他当作一个人和另外一个人对话的过程：

A想找B进行对话，A先对B说：“你在吗？我能不能和你说话？”。B收到A的信息，对A说：“可以，我们来说话吧！”。A收到B的信息，确认两者可以进行交流，便对B说：“开始说话！”之后就可以正式开始聊天的这个过程

现代网站为了确保安全，一般会使用HTTPS协议进行连接，这里涉及到TLS握手的问题，推荐阅读：[什么是 TLS 握手？| Cloudflare](https://www.cloudflare.com/zh-cn/learning/ssl/what-happens-in-a-tls-handshake/)

![image](https://pic.juniortree.com/app/hide.php?key=T0kxNzB3eTV5TzNOeDR1MTdPUlprb3k0WjJrTDg0MWRaQT09)

## 发送`http`请求

一般来说，如果你访问的网站不在上述的HSTS列表之中，浏览器会使用`http`向服务器进行请求内容，`http`使用明文传输，非常不安全，攻击者可以篡改你看到的和输入的信息，下面是一个Web服务器（Nginx）的日志：

```
172.20.0.1 - - [03/Dec/2024:03:46:44 +0000] "GET / HTTP/1.1" 200 2017 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36" "15x.2x.22x.71"
```
上面的请求至少泄露了以下信息：
- 请求IP：`172.20.0.1`（容器化部署）
- 请求时间戳：`[03/Dec/2024:03:46:44 +0000]`
- 请求方法与请求结果：`GET / HTTP/1.1" 200`
- User-Agent：`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36`，请求头，写过爬虫的同学肯定不陌生
- 实际请求IP：`15x.2x.22x.71`，修改请求头后，实际的IP

根据以上信息我们可以获取到以下信息：

这条日志显示，IP 为 `154.28.229.71` 的客户端通过 Chrome 浏览器从 macOS 设备向服务器发起了一次请求，访问了根路径 `/`，并成功接收了大小为 2017 字节的响应内容

前面我们说了，一般支持`https`的网站会将来自`http`的请求重定向至`https`，这样就确保了安全

## HTTP 服务器请求处理

浏览器根据用户的请求构造请求头，发送到目标服务器，请求头可能存在以下信息：
- 请求行：包括请求方法（如 `GET` 或 `POST`）、目标路径（如 `/`）、使用的协议版本（如 `HTTP/1.1`）
- 请求头字段：如 `Host`（目标主机名）、`User-Agent`（浏览器信息）、`Accept`（客户端可以接受的内容类型）等
- 请求体（可选）：用于发送数据，如表单提交内容

对于我们在浏览器中输入网址，之后再回车的操作属于`GET`请求，我们也可以使用`curl`或者Python中的`requests`库来发送请求：

```zsh
(base) liueic-aicnal@HUAWEI-MateBook-Go-ARM ~ % curl -I https://juniortree.com
HTTP/2 200 
accept-ranges: bytes
alt-svc: h3=":443"; ma=2592000
content-type: text/html
date: Tue, 03 Dec 2024 04:52:05 GMT
etag: "66ba2098-7e1"
last-modified: Mon, 12 Aug 2024 14:47:52 GMT
server: Caddy
server: nginx/1.21.5
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-length: 2017
```

这里服务器就返回了HTTP响应：
- `HTTP/2 200`：协议版本和状态码，表示使用 HTTP/2 协议，状态码 200 OK 表示请求成功，服务器返回了正常的响应内容。
- `content-type: text/html`：指明响应的内容类型为 HTML 文档
- `server: Caddy`、`server: nginx/1.21.5`：显示了服务器端使用了两个 Web 服务器，分别是 Caddy 和 Nginx，可能是采用了[反向代理](反向代理)
- `content-length: 2017`：响应内容的长度为 2017 字节

我们可以尝试不使用`-I`参数，而是直接获取到最原始的返回内容：
```zsh
(base) liueic-aicnal@HUAWEI-MateBook-Go-ARM ~ % curl https://juniortree.com 
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Access-Control-Allow-Origin" content="*" />
    <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/images/icon/favicon.ico" />
    <link rel="apple-touch-icon" href="/images/logo/apple-touch-icon.png" />
    <link rel="bookmark" href="/images/logo/apple-touch-icon.png" />
    <link rel="apple-touch-icon-precomposed" sizes="200x200" href="/images/logo/apple-touch-icon.png" />
    <meta name="description" content="小小小站" />
    <meta name="keywords" content="小树,个人主页" />
    <meta name="author" content="小树" />
    <meta name="theme-color" content="#424242" />
    <title>小树的主页</title>
    <!-- HarmonyOS Sans -->
    <!-- 本站 CDN 已开启防盗链，非本站域名不可访问，请更改链接为下方内容，否则自定义字体将失效 -->
    <link rel="stylesheet" href="https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css" />
    <!-- <link rel="stylesheet" href="https://cdn.imsyy.top/gh/imsyy/file/font/HarmonyOS_Sans/regular.min.css" /> -->
    <!-- IE Out -->
    <script>
      if (/*@cc_on!@*/ false || (!!window.MSInputMethodContext && !!document.documentMode))
        window.location.href =
          'https://support.dmeng.net/upgrade-your-browser.html?referrer=' +
          encodeURIComponent(window.location.href);
    </script>
    <script type="module" crossorigin src="/assets/index-1ee3ac7e.js"></script>
    <link rel="stylesheet" href="/assets/index-d6ece963.css">
  <link rel="manifest" href="/manifest.webmanifest"><script id="vite-plugin-pwa:register-sw" src="/registerSW.js"></script></head>

  <body>
    <!-- 主体内容 -->
    <div id="app"></div>
    <!-- noscript -->
    <noscript>
      <div style="text-align: center">请开启 JavaScript</div>
    </noscript>
    
  </body>
</html>
```
这里就输出了网页的内容，但这些内容还只是以文本或者PlainText的形式输出来了，我们人并不能直接阅读这些所谓代码/资源，之后就需要浏览器进行处理了

## 浏览器的背后

浏览器在获取到资源之后会做两件事：
- 解析 —— HTML，CSS，JS
- 渲染 —— 构建 DOM 树 -> 渲染 -> 布局 -> 绘制

由于前端并不是本次计算机网络的主要内容，我们就先一笔带过

## 结语

计算机网络是一个庞大而复杂的系统，单单只靠一次讲座或者简单的讲义是没办法一下子完全覆盖的，在这里我们只能浅显地向大家介绍基础的原理，本文已尽力参考了尽量多和可靠的信息来源，但作者水平有限，如果出现疏漏还请见谅并与我联系

参考文章：
> [当···时发生了什么？](https://github.com/skyline75489/what-happens-when-zh_CN?tab=readme-ov-file)
>
> [多张图带你彻底搞懂DNS域名解析过程 | 林小鹿](https://juejin.cn/user/2410573350859111/posts)
>
> [Root File | IANA](https://www.iana.org/domains/root/files)
>
> [重新思考浏览器输入了 URL 并按下回车之后到底发生了什么——本地 DNS 部分](https://nova.moe/rethink-type-url-dns/)
>
> [35 张图解：被问千百遍的 TCP 三次握手和四次挥手面试题 | 博客园](https://www.cnblogs.com/xiaolincoding/p/12638546.html)
> 
> [什么是反向代理？| 代理服务器介绍 | Cloudflare](https://www.cloudflare.com/zh-cn/learning/cdn/glossary/reverse-proxy/)