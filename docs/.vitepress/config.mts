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
        repoURL: () => 'https://github.com/CNU-OS/ls-lecture.git',
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
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: '讲座目录',
        items: [
          { text: '概述', link: '/概述' },
          { text: '信息检索与搜索引擎的使用', link: '/信息检索与搜索引擎的使用' }
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
  }
})