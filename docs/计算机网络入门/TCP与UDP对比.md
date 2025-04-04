# TCP与UDP的对比

### 1. 基本特性
| 特性             | TCP                                             | UDP                       |
|------------------|-------------------------------------------------|---------------------------|
| **协议类型**     | 面向连接（Connection-oriented）                | 无连接（Connectionless） |
| **传输模式**     | 流式传输（Reliable, byte stream）               | 数据报（Unreliable, packet-oriented） |
| **传输顺序**     | 保证数据按顺序到达                            | 不保证顺序               |
| **可靠性**       | 提供错误检测、重传和确认机制                   | 无确认机制，不保证传递   |
| **速度**         | 较慢（需要建立连接和维护状态）                  | 快速（无需建立连接）     |

---

### 2. 数据传输
| 特性                   | TCP                                             | UDP                       |
|------------------------|-------------------------------------------------|---------------------------|
| **连接建立**           | 需要三次握手（Three-way handshake）             | 无需连接，直接发送       |
| **拥塞控制**           | 有拥塞控制和流量控制，避免网络过载              | 无拥塞控制，可能引起丢包 |
| **数据校验和**         | 校验头部和数据，确保完整性                      | 仅校验头部，简单校验     |
| **数据大小**           | 面向流，数据大小没有固定限制                    | 数据报最大为 65,535 字节 |

---

### 3. 使用场景
| 使用场景               | TCP                                      | UDP                        |
|------------------------|------------------------------------------|----------------------------|
| **典型应用**           | HTTP/HTTPS、FTP、SMTP、Telnet等          | DNS查询、视频流、VoIP等    |
| **实时性需求**         | 不适合实时应用，需等待确认和重传          | 适合实时应用，无需确认     |
| **可靠性需求**         | 高可靠性传输，适合文件传输等              | 低可靠性，适合容忍丢包的应用 |

---

### 4. 头部结构
| 特性                   | TCP                                           | UDP                       |
|------------------------|-----------------------------------------------|---------------------------|
| **头部大小**           | 20-60 字节                                   | 8 字节                    |
| **头部字段**           | 包括序列号、确认号、窗口大小等复杂字段       | 包括源端口、目标端口等简洁字段 |
| **额外开销**           | 较大（增加处理时间）                         | 较小                     |

---

### 优缺点总结
| **TCP**                     | **UDP**                     |
|-----------------------------|-----------------------------|
| **优点**                    | **优点**                    |
| 1. 可靠传输，数据不丢失。    | 1. 快速，适合实时应用。      |
| 2. 按顺序传递，避免乱序。    | 2. 开销小，效率高。          |
| 3. 自动处理拥塞和流量控制。  | 3. 支持广播和多播通信。      |
| **缺点**                    | **缺点**                    |
| 1. 较慢，建立连接需要额外时间。 | 1. 不保证数据可靠性和顺序。   |
| 2. 资源占用多，适合小规模通信。 | 2. 易丢包，需额外处理机制。   |