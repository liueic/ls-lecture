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
- [x] 信息安全与开源软件（2024年12月1日）

## 贡献要求

我们欢迎任何朋友提Issue或者直接发起PR，需要注意的是，我们使用GitHub Action将你的图链转存到我们可靠的服务器上，如果转存失败（图裂）请及时与我们取得联系

当你进行PR或者我合并分支之后则默认你已同意我保存你的图片，为避免不必要的版权问题，特此说明

当然，由于转存的存在，远程仓库和本地的分支可能会存在冲突——Action会直接修改仓库中的图链，推荐的解决方法有两种：

1. 合并（merge）： 如果你希望合并远程更改到你的本地分支，可以使用以下命令：

```
git pull origin main --no-rebase
```

2. 变基（rebase）： 如果你希望将你的本地更改应用到远程更改之上，可以使用以下命令：

```
git pull origin main --rebase
```

如果你使用一些现代化的Git GUI可能可以很轻松地解决，如果你使用CLI，我强烈建议你向GPT寻求帮助，AI帮助解决诸类问题有奇效

## 许可

本讲座中的所有内容、代码、练习、视频均遵循[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)，如果你想要进行转载的话，应当注明出处