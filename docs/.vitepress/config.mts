import { defineConfig } from 'vitepress'
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import {
  ThumbnailHashImages,
} from '@nolebase/vitepress-plugin-thumbnail-hash/vite'
import { UnlazyImages } from '@nolebase/markdown-it-unlazy-img'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      GitChangelog({
        repoURL: () => 'https://github.com/Aicnal/ls-lecture.git',
      }),
      ThumbnailHashImages(),
      GitChangelogMarkdownSection(),
    ]
  },
  lang: 'zh-CN',
  title: "计算机扫盲讲座讲义",
  description: "计算机扫盲讲座",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Memos', link: 'https://memos.caimeo.world/' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '概述', link: '/概述' }
        ]
      },
      {
        text: '基础使用',
        items: [
          { text: '信息检索与搜索引擎的使用', link: '/信息检索与搜索引擎的使用' }
        ]
      },
      {
        text: '进阶玩法',
        items: [
          { text: '信息安全与开源软件', link: '/信息安全与开源软件' }
        ]
      },
      {
        text: '计算机网络',
        items: [
          { text: '计算机网络', link: '/计算机网络入门' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Aicnal/ls-lecture' }
    ]
  },
  markdown: {
    image: {
      lazyLoading: true
    },
    config: (md) => {
      md.use(UnlazyImages(), {
        imgElementTag: 'NolebaseUnlazyImg',
      });
    },
  },
  ignoreDeadLinks: true,
})