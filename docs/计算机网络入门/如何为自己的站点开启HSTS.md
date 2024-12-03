这里以Caddy为例，你需要在`Caddyfile`中修改`header`部分：

```
juniortree.com {
encode gzip
reverse_proxy 172.17.0.1:8000
header {
	Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
		}
}
```

你只需要添加其中的`Strict-Transport-Security`即可，需要注意的是，`max-age`必须为`31536000`，这样你才能提交到浏览器预加载列表中

![image](https://pic.juniortree.com/app/hide.php?key=TUI0N29kZ0I3OEpVREpJZGQwU1pDb0R5Y2pUM0V3bDgwZz09)