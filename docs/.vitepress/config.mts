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
  head: [
    [
      'script',
      {
        src: 'https://ana.juniortree.com/script.js',
        'data-website-id': '394d4ff7-1ba3-4582-a800-fca3d757b544',
        defer: ''
      }
    ]
  ],
  vite: {
    plugins: [
      GitChangelog({
        repoURL: () => 'https://github.com/liueic/ls-lecture',
      }),
      ThumbnailHashImages(),
      GitChangelogMarkdownSection(),
    ]
  },
  lang: 'zh-CN',
  title: "计算机讲座",
  description: "计算机讲座",
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
        text: 'Linux 基础使用',
        items: [
          { text: 'Docker的基础使用', link: '/linux/Docker' },
          { text: 'Docker 进阶笔记', link: '/linux/Docker/advance' }
        ]
      },
      {
        text: '计算机网络',
        items: [
          { text: '当你输入网址，按下回车的背后', link: '/计算机网络入门' }
        ]
      },
      {
        text: '更多',
        items: [
          { text: 'Bug反馈', link: '/bug' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/liueic/ls-lecture' }
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