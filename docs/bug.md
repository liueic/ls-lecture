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

