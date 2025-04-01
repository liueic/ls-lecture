# Docker 启动

> 「容器」是近些年来非常流行的一种**虚拟化技术**，它通过在操作系统层面上隔离应用及其依赖环境，使应用可以在不同的计算环境中一致性地运行，而 Docker 就是其最流行的容器化工具。

## 为什么要使用 Docker

### 解决“在我电脑能跑”问题（环境一致性）

在传统开发模式下，代码可以在开发环境运行，但换到测试或生产环境可能出现依赖冲突、缺少库、版本不兼容等问题。

如果使用了 Docker，我们可以一口气把所有的依赖打包到 Docker 容器中，这样不管是在本地还是云端，都能无缝运行——“一次构建，快速运行”。

### 更轻量、更高效（比虚拟机更优）

传统的虚拟机需要运行一个完整的操作系统，占用大量的**CPU、内存、存储**资源，而且启动速度较慢。

而 Docker 采用共享操作系统内核的方式，在占用上更低，而且启动速度快（毫秒）。

### 易于部署，标准统一

传统部署需要手动配置环境、安装依赖、拷贝代码，繁琐且容易出错，而且不同开发者的本地环境可能不同，出现“代码能跑，部署失败”。

而 Docker 则有统一的 Dockerfile，我们只需要在配置文件中定义好对于的环境，即可统一标准。

### 对于我们普通用户

很多优秀的开源项目都提供了对应 Docker 镜像，我们可能只需要使用简单的几个命令，或者「复制粘贴」一下对应的配置文件，就可以快速地将项目跑起来，这大大提高了我们使用效率，降低了我们的上手门槛。

## Docker 的核心组件

对于我们初学者来说，对于 Docker 的了解并不需要面面俱到，我们只需要知道 Docker 由三个最基础的组成：

- 镜像（Image）：软件的模板
- 容器（Container）：基于镜像运行的实例
- 仓库（Registry）：存储镜像的地方（Docker Hub, 私有仓库）

## Docker 安装

### Linux

各大软件源都提供了 Docker 的安装包，你可以安装官方文档一步一步安装：[Install Docker on Debian \|Docker Docs](https://docs.docker.com/engine/install/debian/)

当然你也可以使用官方所提供的一键脚本，为你做好所有工作，免去了手动安装的繁琐：

```bash
curl -fsSL https://get.docker.com | bash -s docker
```

你有可能因为网络问题无法正常安装，可以尝试使用阿里云提供的加速源：

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

安装完成之后将 docker 添加到用户组：

```
sudo adduser 用户名 docker
```

将需要使用 Docker 的用户加入 docker 用户组。注意：docker 用户组中的用户拥有与 root 等效的权限，需要 root 权限 启动 Docker 守护进程，如果你觉得这样的方式存在安全问题，可以尝试一下 Podman，它支持 Rootless。

### Windows & macOS

Docker 在 Windows 和 macOS 上与 Linux 上的运行方式并不完全相同，因为它们的系统内核并不原生支持容器化技术，Docker 不得不先虚拟出一个 Linux 内核环境，之后在此之上再运行容器，这样的话无疑存在着性能损失。

Docker 在官网提供了名为「**Docker Desktop**」的解决方案，对于 Windows 用户来说，可以查看官方文档：[Windows \| Docker Docs](https://docs.docker.com/desktop/setup/install/windows-install/)来进行安装。

需要注意的是，Windows 用户需要满足一系列的系统要求，诸如开启虚拟化（Hyper-V 或者 WSL）。

对于 macOS 用户而言，尽管可以使用官方提供的 「Docker Desktop」，我们更推荐使用更轻量的「[OrbStack · Fast, light, simple Docker & Linux](https://orbstack.dev/)」，它提供了官方一样的 Docker Engine，因此不用担心兼容性或者其他的性能问题。

::: tip
事实上，也存在着 Windows 容器，也就是直接调用 Windows NT 内核，但是这个技术太冷门，而且与 Linux 容器并不兼容，如果你一定要使用 Windows 运行一些容器，你也可以尝试寻找基于 Windows 构建的容器。
:::

### 配置容器镜像加速

Docker 默认从 Docker Hub 上拉取对应的镜像，但由于网络问题，拉取的速度较慢或不稳定，因此在校园网环境下，配置 Docker 镜像加速器就是很有必要的了。

::: tip
寻找可用的 Docker 加速器是一项技术活，你可以查看这个文档：[镜像加速器 | Docker - 从入门到实践](https://yeasy.gitbook.io/docker_practice/install/mirror#bu-zai-ti-gong-fu-wu-de-jing-xiang)来获取一些可用的 Docker 镜像。
:::

#### Linux

为了使用这些 Docker 加速器，我们需要配置一些文件，在 Debian / Ubuntu 上，编辑 `/etc/docker/daemon.json`，如果该文件不存在则创建，写入如下内容：

```json
{
  "registry-mirrors": [
    "https://docker.io"
  ]
}
```

::: warning
一定要保证符合 JSON 格式要求，这里只是以 `docker.io` 为例，并不保证该镜像一定可用，需要自行测试
:::

之后重启 Docker 服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

之后使用 `docker info` 来检查是否配置成功，如果出现 ` Registry Mirrors:` 的字段，并且下面跟着你的 Docker 加速器地址的话那就是正确的

### Windows

对于使用 `Windows` 用户，在任务栏托盘 Docker 图标内右键菜单选择 `Change settings`，打开配置窗口后在左侧导航菜单选择 `Docker Engine`，在右侧像下边一样编辑 `json` 文件，之后点击 `Apply & Restart` 保存后 `Docker` 就会重启并应用配置的镜像地址了。

```json
{
  "registry-mirrors": [
    "https://docker.io"
  ]
}
```

### macOS

同 Windows。

```json
{
  "registry-mirrors": [
    "https://docker.io"
  ]
}
```

## Hello World!

现在让我们来尝试用 Docker 输出一个简单的“Hello World”。请先启动你的 Docker Desktop，并且确保 Docker Engine 已经启动了，之后我们便可以在终端中输入（如果你是使用 Windows，请调出你的 CMD 或者 PowerShell）：

```bash
docker run --rm hello-world

```

```bash
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c9c5fd25a1bd: Pull complete 
Digest: sha256:7e1a4e2d11e2ac7a8c3f768d4166c2defeb09d2a750b010412b6ea13de1efb19
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (arm64v8)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

按照这样，你的第一个使用 Docker 运行的“Hello World”就运行成功了。

## 使用 Docker

现在让我们使用 Docker 来运行一个简单的 Web 服务器，我们只需要在终端中输入：

```bash
docker run -d -p 8080:80 nginx
```

这时候不出意外的话会输出以下结果：

```bash
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
d9b636547744: Pull complete 
0994e771ba34: Pull complete 
bef2ee7fab45: Pull complete 
13f89c653285: Pull complete 
589701e352f8: Pull complete 
8e77214beb25: Pull complete 
4c7c1a5bd3af: Pull complete 
Digest: sha256:124b44bfc9ccd1f3cedf4b592d4d1e8bddb78b51ec2ed5056c52d3692baebc19
Status: Downloaded newer image for nginx:latest
a9ed6b6c3d77ff8b35e698a3ce5e27dd0512ce6577e2851f8a39fdace6d29109
```

此时在浏览器中打开 `http://localhost:8080/` 会看到 Nginx 环境页面，我们成功地在本地启动了一个 Web 服务，如果你的网络环境足够好，整个过程不超过1分钟。

这里的 `docker run` 就是容器运行的命令，`-d` 的意思是后台运行，`-p` 指的是暴露的端口，`8080` 是容器对外暴露的端口，而 `80` 就是容器内的端口。

那我们运行的容器要如何查询呢？我们可以使用 `docker ps`：

```bash
docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED         STATUS         PORTS                                     NAMES
a9ed6b6c3d77   nginx     "/docker-entrypoint.…"   4 seconds ago   Up 4 seconds   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   sleepy_solomon
```

这里就显示出了我们当前正在运行的全部容器，其中的 `CONTAINER ID` 就是每个容器运行的编号，我们既可以通过这个ID，也可以通过NAME对这个容器进行操作。

```bash
docker stop a9ed6b6c3d77 #停止容器
docker rm a9ed6b6c3d77 #删除容器
```

容器停止之后就无法使用 `docker ps` 来进行查看，可以使用 `docker ps -a` 来查看全部的容器（包括运行和停止的）

可以使用 `docker images` 来查看当前下载的镜像：

```bash
docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
nginx        latest    2c9168b3c9a8   7 weeks ago   197MB
```

还是可以通过 `IMAGE ID` 来对镜像进行删除：

```bash
docker rmi 2c9168b3c9a8 #删除镜像
```

## 构建自己的 Docker 镜像

在这里我们准备的一个小 Demo，让你自己快速地体验构建 Docker 镜像的过程。

首先我们需要拉取一个仓库：

```bash
git clone https://github.com/liueic/AirPage.git
```

这个项目的结构如下：

```bash
.
├── Dockerfile
├── docker-compose.yml
├── go.mod
├── go.sum
├── main.go
└── templates
    ├── error.html
    └── index.html
```

这里的核心便是 `Dockerfile`，也就是构建镜像的模版，我们可以使用 `docker build` 命令来构建一个容器：

```bash
 docker build -t air_page .
```

这里的 `-t` 是给这个镜像打上一个标签，标签名为 `air_page`，这样的话会方便我们查找对应的镜像，构建完成之后，按照文档的提示去申请一个 API KEY：https://aqicn.org/data-platform/token/

之后就可以启动了（这里的 API KEY 是用于后端的天气API查询）

使用 `docker run` 进行启动：

```bash
docker run -d \
  --name web \
  -p 8080:8080 \
  -e API= 替换成你的API\
  --restart unless-stopped \
  air_page
```

这个命令做了以下事情：
1. `-d` - 在后台运行容器
2. `--name web` - 将容器命名为 `"web"`
3. `-p 8080:8080` - 将主机端口8080映射到容器端口`8080`
4. `-e API= `- 设置环境变量API，需要替换成你获取到的
5. `--restart unless-stopped` - 设置重启策略为除非手动停止否则自动重启
6. `air_page` - 使用刚才本地构建的镜像

之后如果不出意外你将获得一个漂亮的空气质量展示页面

## 使用 Docker Compose

上面我们使用终端来和 Docker 交互的方法虽然很快，但是当我们需要几个容器协同工作，或者有迁移需求的时候就很不方便，这时候我们就可以使用 Docker Compose 来编排容器，比如说我们可以运行一个 Wordpress：

```yaml
services:
  db:
    # We use a mariadb image which supports both amd64 & arm64 architecture
    image: mariadb:10.6.4-focal
    # If you really want to use MySQL, uncomment the following line
    #image: mysql:8.0.27
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=somewordpress
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
    expose:
      - 3306
      - 33060
  wordpress:
    image: wordpress:latest
    volumes:
      - wp_data/data:/var/www/html
      - wp_data/conf/uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
    ports:
      - 8080:80
    restart: always
    environment:
      - WORDPRESS_DB_HOST=db
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
volumes:
  db_data:
  wp_data:
```

之后在终端中执行 `docker compose up -d`，然后访问 `http://localhost:8080` 就可以看到 Wordpress 的欢迎界面，此时就完成了在本地搭建 Wordpress

之后同样，使用 `docker compose stop` 来关闭容器，使用 `docker compose rm` 来删除镜像