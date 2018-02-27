# 笔记

## HTTP协议、HTTPS协议

### HTTP协议 

**参考** [HTTP 协议入门](http://www.ruanyifeng.com/blog/2016/08/http.html)

![HTTP](https://github.com/Sanchez3/MyProject/blob/master/!!!Study/http.jpg)

- 超文本传输协议，不仅传输文字、HTML页面，还能传输图像、视频、二进制文件……

- 基于TCP/IP协议（[传输控制协议](https://zh.wikipedia.org/wiki/TCP)/[因特网协议](https://zh.wikipedia.org/wiki/IP)）的应用层协议

  - TCP/IP参考模型：网络访问层-互联网层-传输层-应用层
  - 应用层协议还包文件传输协议（FTP）、电子邮件传输协议（SMTP）、域名服务（DNS，把主机名映射到网络地址）……

- 客户端和服务器的通信格式，默认使用80端口

- 目前版本 **HTTP/2**

  - **HTTP/0.9** GET index.html，建立链接—>客户端请求网页—>服务器发送完毕—>关闭TCP链接
  - **HTTP/1.0** 每个TCP链接只能发送一个请求（添加`Connection`字段，该解决方法非标准）

    - 传输任何格式的内容
    - GET命令、POST命令、HEAD命令
    - 头信息（HTTP header），用来描述元数据
    - 状态码
  - **HTTP/1.1** 同一TCP连接中，请求按次序进行。
    - 持久链接，TCP连接默认不关闭，一段时间内无活动，自动关闭
    - 管道机制，同一TCP连接中，发送多个请求
    - `Content-Length`字段，区分数据包归属
    - 分块传输编码，`Transfer-Encoding`字段，回应的数据块数量未定

### HTTP/2

- 二进制协议，头信息和数据体都是二进制，并且统称为"帧"（frame）：头信息帧和数据帧。，解析方便。
- 多工，一个连接里，客户端和浏览器可以同时发多个请求或回应，避免了["队头堵塞"](https://zh.wikipedia.org/wiki/%E9%98%9F%E5%A4%B4%E9%98%BB%E5%A1%9E)（Head-of-line blocking）。
- 数据流，每个请求或回应的所有数据包，称为一个数据流（stream），客户端发出ID奇数，服务器发出ID偶数。可设优先级。
- 头消息压缩，头消息使用`gzip`或`compress`压缩后再发送。客户端和服务器维护头信息表，建立索引，防止重复。
- 服务器推送，未经请求，主动发资源。



### HTTP状态码
200 - 请求成功，301 - 资源（网页等）被永久转移到其它URL，404 - 请求的资源（网页等）不存在，500 - 内部服务器错误

| 分类   | 分类描述                    |
| ---- | ----------------------- |
| 1**  | 信息，服务器收到请求，需要请求者继续执行操作  |
| 2**  | 成功，操作被成功接收并处理           |
| 3**  | 重定向，需要进一步的操作以完成请求       |
| 4**  | 客户端错误，请求包含语法错误或无法完成请求   |
| 5**  | 服务器错误，服务器在处理请求的过程中发生了错误 |

### HTTP 消息结构

HTTP使用唯一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。URL（Uniform Resource Locator, 统一资源定位符）是特殊的URI，不仅用来标识一个资源，还指明了如何定位这个资源。

#### 客户端请求消息

请求信息格式：请求行（request line）、请求头部（header）、空行和请求数据。
![Request](https://github.com/Sanchez3/MyProject/blob/master/!!!Study/request.jpg)

#### 服务器响应消息

响应信息格式：状态行、消息报头、空行和响应正文。

![Request](https://github.com/Sanchez3/MyProject/blob/master/!!!Study/response.jpg)



### HTTP工作原理

请求/响应模型，客户端从服务器请求页面，服务器吧页面传给客户端。

步骤：

1. **客户端连接到服务器。**与服务器的HTTP端口（默认端口80）建立TCP[套接字](https://www.zhihu.com/question/21383903/answer/258837774)连接。
2. **发送HTTP请求。**通过TCP套接字，客户端向服务器发送请求。
3. **服务器接受请求并返回HTTP响应。**服务器解析请求，定位资源，写到TCP套接字，客户端读取。
4. **释放链接TCP连接。**由`Connection`字段标识连接状态。
5. **客户端解析HTML内容。**先解析状态行，解析响应头，响应头告知以下为若干字节的HTML文档和文档的字符集。读取响应数据HTML，根据语法格式化，显示。

eg：浏览器输入URL，回车访问流程：

> 1. 浏览器想DNS服务器请求解析该URL中域名对应的IP地址。
> 2. 解析IP地址，根据IP地址和默认端口80，与服务器建立TCP连接。
> 3. 浏览器发出读取文件（URL中域名后面部分对应的文件）的HTTP请求，该请求报文作为TCP三次握手的第三报文数据发给服务器。
> 4. 服务器对浏览器作出相应，并把对应的HTML文本发送给浏览器。
> 5. 释放TCP链接
> 6. 浏览器将该HTML文本显示。

![Request](https://github.com/Sanchez3/MyProject/blob/master/!!!Study/url.jpg)

### HTTPS协议（SSL/TLS协议）

> Notes: HTTP/2 协议，只有在HTTPS环境才会生效。

不使用SSL/TLS的HTTP通信，都是不加密的通信。有风险：窃听风险、篡改风险、冒充风险。

SSL/TLS协议希望做到所有信息加密传播、具有校验机制、配备身份证书。

####基本运行过程

HTTPS连接和HTTP连接都建立在TCP协议之上。

首先**socket通信过程**如图所示

![Request](https://github.com/Sanchez3/MyProject/blob/master/!!!Study/socket.jpg)

其中普通的HTTP连接，前三次TCP协议三次握手后，就可以发送数据了。

而HTTPS连接，经过三次握手阶段后，还有**SSL握手**

1. 客户端向服务器索要并验证公钥
2. 双方写上生成“对话密钥”
3. 双方采用“对话密钥“进行加密通信

其中1，2步骤，称为”握手阶段“，其中有四次通信：

1. **客户端发出请求（CLientHello）**其中包括信息：支持的协议版本、客户端生成的随机数、支持的加密方法、支持的压缩方法。
2. **服务器回应（SeverHello）**其中包括信息：确认使用的加密协议版本、服务器生成的随机数、确认加密方法、服务器证书。
3. 客户端回应 协议若不可信，警告访问者。可信，发送信息：随机数、编码改变通知、客户端握手结束通知和标识客户端握手阶段已结束。
4. 服务器回应 收取第三个随机数pre-master key，生成”会话密钥“。发送信息：编码改变通知，服务器握手结束通知和标识服务器握手阶段已结束。

SSL/TLS握手阶段详细过程如图所示（该阶段所有通信为明文）而后进入加密通信，使用普通的HTTP协议，并用“会话密钥”加密内容。

![Request](https://github.com/Sanchez3/MyProject/blob/master/!!!Study/handshake.jpg)



