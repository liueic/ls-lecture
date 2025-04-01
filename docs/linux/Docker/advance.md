# Docker 学习笔记

## 写在前面

重要的事情说三遍：读文档！读文档！读文档！

[官方文档｜Docker Docs](https://docs.docker.com/)

## 核心概念

- **镜像（Image）**：一个轻量级、独立的可执行软件包，包含应用程序及其运行环境。
- **容器（Container）**：镜像的运行实例，彼此隔离，互不干扰。
- **Dockerfile**：定义镜像构建过程的文本文件，包含一系列指令。
- **仓库（Registry）**：存储和分发 Docker 镜像的地方，Docker Hub 是最常用的公共仓库。
- **网络（Network）**：容器之间或容器与外界通信的机制。
- **数据卷（Volume）**：用于持久化数据，避免数据因容器销毁而丢失。

## 安装

Docker 官方为你提供了傻瓜式的一键脚本：

```bash
curl -fsSL https://get.docker.com | bash -s docker
```

## 常用 Docker 指令

### 运维

```bash
docker pull <镜像名> # 拉取镜像
docker images # 查看本地的镜像
docker rmi <镜像ID> # 删除镜像
```

```bash
docker run -d -p 80:80 # -d 是后台运行 -p 是指暴露的端口
docker ps # 查看正在运行的容器
docker ps -a # 查看所有已创建容器，包括已经停止的
docker stop <容器名/ID> # 停止运行容器
docker rm <容器名/ID> # 删除容器，如果卷没有映射出来则一同删除
```

```bash
docker cp /path <容器ID>:<容器内路径> # 将文件从容器中复制到宿主机
docker exec -it <容器ID> /bin/bash # 如果容器中没有 bash 则使用 sh
docker exec -it <容器ID> /bin/sh
```

### 迁移

```bash
docker save <容器名/ID> > image.tar # 将容器导出为tar
docker load -i image.tar # 在目标机器上重新导入容器
```

## Docker Compose

Compose 文件的编写需要遵从 yaml 文件的基本原则，它的基本原则如下：

- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用Tab键，只允许使用空格。
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

一个最基础的 Compose 文件应该是这样的：

```yaml
services:
  gitea:
    image: gitea/gitea:latest
    environment:
      - DB_TYPE=postgres
      - DB_HOST=db:5432
      - DB_NAME=gitea
      - DB_USER=gitea
      - DB_PASSWD=gitea
    restart: always
    volumes:
      - git_data:/data
    ports:
      - 3000:3000
  db:
    image: postgres:alpine
    environment:
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=gitea
      - POSTGRES_DB=gitea
    restart: always
    volumes:
      - db_data:/var/lib/postgresql/data
    expose:
      - 5432
  volumes:
    db_data:
    git_data:
```

新版的 Compose 文件已经不需要去定义 `service` ，如果你继续定义将会收到警告：

> The top-level `version` property is defined by the Compose Specification for backward compatibility. It is only informative and you'll receive a warning message that it is obsolete if used.
>
   Compose doesn't use `version` to select an exact schema to validate the Compose file, but prefers the most recent schema when it's implemented.
>
   Compose validates whether it can fully parse the Compose file. If some fields are unknown, typically because the Compose file was written with fields defined by a newer version of the Specification, you'll receive a warning message.

### `services`

每个 Compose 文件都必须要定义一个 `services` ，其中 `gitea` 和 `db` 的层级是一样的，为定义的服务名称

`image` 的意思是指拉取的镜像，其中 `:latest` 指的是拉取的最新的镜像，可以自己制定镜像的版本号

`environment` 指的是环境变量，当然也可以不在 Compose 文件中指定，可以直接写在与 Compose 文件同目录的 `.env` 文件中

#### 使用 `.env` 文件

`.env` 文件内容如下：

```txt
DATABASE_URL=postgres://user:password@db:5432/mydatabase
REDIS_URL=redis://redis:6379
```

然后在 Compose 文件中，可以直接使用这些变量，而不用再次显式声明：

```yaml
services:
  web:
    image: myapp
    environment:
      - DATABASE_URL
      - REDIS_URL
```

#### `ports` 端口

用来定义主机和容器之间的端口映射（mappings）

如果你定义了 `network_mode:host` 再进行端口映射，则会出现错误

`[主机端口]:[容器内IP](port)`

```yaml
ports:
  - "3000"
  - "3000-3005"
  - "8000:8000"
  - "9090-9091:8080-8081"
  - "49100:22"
  - "8000-9000:80"
  - "127.0.0.1:8001:8001"
  - "127.0.0.1:5000-5010:5000-5010"
  - "6060:6060/udp"
```

#### `expose` 暴露

用来暴露入站端口（incoming），这个暴露和 `ports` 不同，只能在 Compose 内定义的网络进行通讯，具体语法：

`<端口号>/[tcp/udp]` 或者 `<开始端口-结束端口>[tcp/udp]`

```yaml
expose:
  - "3000"
  - "8000"
  - "8080-8085/tcp"
```

如果不定义是 `tcp/udp`，则默认是 `tcp`

#### `restart` 重启

`restart` 定义了当容器停止后应该如何处理

- `no`： 默认的选项，容器关闭了就自动关闭了
- `always`： 不管容器是由于错误还是手动停止，都会自动重启
- `unless-stopped`： 除非是手动停止，否则容器自动重启
- `on-failure`：仅在容器因错误退出时重启，可以指定一个可选的重启次数限制，如 `on-failure:3`

```yaml
restart: "no"
restart: always
restart: on-failure
restart: on-failure:3
restart: unless-stopped
```

#### `volumes` 卷

用于定义容器可以用来持久化存储的挂载点，当容器被重启、删除、重新创建的时候数据不会消失

```yml
 volumes:
      - type: volume
        source: db-data
        target: /data
        volume:
          nocopy: true
          subpath: sub
      - type: bind
        source: /var/run/postgres/postgres.sock
        target: /var/run/postgres/postgres.sock
```

```yml
volumes:
    - db_data:/var/lib/postgresql/data
```

### `networks` 

`networks` 其实是和 `services` 的层级是一样的，在 `networks` 里面定义了容器如何与外部进行通讯的方式：

```yml
services:
  proxy:
    build: ./proxy
    networks:
      - frontend
  app:
    build: ./app
    networks:
      - frontend
      - backend
  db:
    image: postgres
    networks:
      - backend

networks:
  frontend:
    # Specify driver options
    driver: bridge
    driver_opts:
      com.docker.network.bridge.host_binding_ipv4: "127.0.0.1"
  backend:
    # Use a custom driver
    driver: custom-driver
```

Docker 其实是提供了对 IPv6 的支持，具体可以参考：[Use IPv6 networking | Docker Docs](https://docs.docker.com/engine/daemon/ipv6/)

在上面这个例子中：

- 这个 Docker Compose 文件定义了三个服务（`proxy`、`app` 和 `db`）以及两个网络（`frontend` 和 `backend`）
- `proxy` 和 `app` 服务可以通过 `frontend` 网络进行通信，而 `app` 和 `db` 服务可以通过 `backend` 网络进行通信

当然也可以啥也不干，只命名网络：

```yml
networks:
  backnet:
  frontnet:
```

#### `external` 连接到已经创建的其他网络

```yml
services:
  proxy:
    image: example/proxy
    networks:
      - outside
      - default
  app:
    image: example/app
    networks:
      - default

networks:
  outside:
    external: true
```

使用 `external` 将尝试连接到已经创建好的其他 Docker 网络，这对于进行容器内的通讯非常有帮助

### `volumes`

`volumes` 能够帮助你将容器内的文件持久化存储，Docker engine 能帮助你处理好这一切

```yml
services:
  backend:
    image: example/database
    volumes:
      - db-data:/etc/data

  backup:
    image: backup-service
    volumes:
      - db-data:/var/lib/backup/data

volumes:
  db-data:
```

## Dockerfile

```dockerfile
# 使用官方的Go镜像作为基础镜像
FROM golang:1.20 AS builder

# 设置工作目录
WORKDIR /app

# 复制当前目录内容到工作目录
COPY . .

# 下载依赖
RUN go mod download

# 编译Go程序
RUN go build -o run

# 使用一个更小的基础镜像来运行编译后的二进制文件
FROM alpine:latest

# 安装运行二进制文件所需的依赖项
RUN apk add --no-cache libc6-compat

# 设置工作目录
WORKDIR /app

# 从构建阶段复制编译后的二进制文件
COPY --from=builder /app/run .

# 设置执行权限
RUN chmod +x run

# 设置要暴露的端口
EXPOSE 3000

# 运行程序
CMD ["./run", "-input", "/input", "-output", "/output", "-quality", "90", "-workers", "4"]
```

如何简单的去理解 Dockerfile？我的理解是把他当作一个菜单，`FROM` 就是厨房，定义了一个基础镜像，这个镜像可以是操作系统，也可以是别人封装好的其他镜像，我们就可以在这个为我们准备好东西的厨房里面炒菜了。`WORKDIR` 就是灶台所在的地方，工作区嘛，为了规范一般都设置在 `/app` 中。`COPY` 就是把买来的食材（本地工作区的文件）放到灶台 `WORKDIR` 上。`RUN` 就是开始做菜，去执行一些具体要在构建容器的时候执行的指令，在这里我们执行了 `RUN go mod download` 和 `RUN go build -o run` ，先安装了 Go 的库，之后再编译。`EXPOSE` 类似于上菜的窗口，用来告诉用户，写入到 Compose 中的端口。最后的 `CMD` 就是上菜的过程，当容器正在开始运行 `docker run` 之后要运行的程序

## Docker build 构建Docker

最简单的构建方法就是：

```bash
docker -t image <dockerfile path> # 其中 -t 后面的就是你指定的镜像名
```

### Multi-platform builds 多平台构建

多平台构建能够帮助你在一个平台上构建出可以用于 `linux/amd64` 、 `linux/arm64` 或者 `windows/amd64` 等多种平台等镜像

```bash
docker buildx build --platform linux/amd64,linux/arm64 .
```