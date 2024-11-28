# 计算机扫盲

这个站点是为了展示[计算机扫盲](https://ls.oneleaf.me)系列的讲座讲义以及课后思考而建立

我们欢迎你继续提交更多的内容，修正我们讲义中的一些错误，并且为我们后续讲座提供一些新的建议

## 部署

该站点使用了静态网站生成器[Vitepress](https://vitepress.dev/)，如果没有这些优秀的开源项目，我们将不会如此顺利的进行部署

必备工具：
- nodejs
- git

具体操作：
```bash
git clone https://github.com/Aicnal/ls-lecture.git
npm add -D vitepress
npm run docs:dev
```

之后会在本地`5173`端口进行预览，不过我们不建议你在服务器上进行部署。如需在服务器上部署请进行构建：

```bash
npm run docs:build
```

其他的部署方法可以参考：[部署 VitePress 站点](https://vitepress.dev/zh/guide/deploy#build-and-test-locally)

## 课程内容

- [x] 如何快速高效地利用搜索引擎检索信息（2024年11月21日）
- [ ] 信息安全与开源软件

## 贡献要求

我们欢迎任何朋友提Issue或者直接发起PR，需要注意的是，我们使用GitHub Action将你的图链转存到我们可靠的服务器上，如果转存失败请及时与我们取得联系

当你进行PR或者我合并分支之后则默认你已同意我保存你的图片，为避免不必要的版权问题，特此说明

## 许可

本讲座中的所有内容、代码、练习、视频均遵循[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)，如果你想要进行转载的话，应当注明出处