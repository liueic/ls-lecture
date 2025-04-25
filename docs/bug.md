# 目前存在的一些问题

## avatar 头像显示问题

贡献者的 avatar 来自于 `https://gravatar.com`，但是这个页面在大陆有访问问题，显示的这个依赖于插件 `@nolebase/vitepress-plugin-git-changelog`，查看源码后发现已经写死在函数中，如果要修改则必须 Fork 一个新的：https://github.com/nolebase/integrations/blob/b83566f8683db22ca43e6ed1b649d55eff471460/packages/vitepress-plugin-git-changelog/src/vite/helpers.ts

```ts
export async function newAvatarForAuthor(mappedAuthor: Contributor | undefined, email: string): Promise<string> {
  if (mappedAuthor) {
    if (mappedAuthor.avatar)
      return mappedAuthor.avatar
    if (mappedAuthor.username)
      return `https://github.com/${mappedAuthor.username}.png`
  }

  return `https://gravatar.com/avatar/${await digestStringAsSHA256(email)}?d=retro`
}
```

### 解决方案

使用 `patch-package`

并且在 `package.json` 的 `scripts` 中添加：

```json
"scripts": {
  "postinstall": "patch-package"
}
```

直接到 `node_modules` 文件夹下找到包的文件夹，这里可以使用 VS Code 的全局检索，对其进行修改

生成补丁文件，之后会生成一个新的 `patches` 的文件夹

```bash
pnpm patch @nolebase/vitepress-plugin-git-changelog
```

提交变更：

```bash
pnpm patch-commit '/Users/liueic/Documents/ls-lecture/node_modules/.pnpm_patches/@nolebase/vitepress-plugin-git-changelog@2.16.0'
```