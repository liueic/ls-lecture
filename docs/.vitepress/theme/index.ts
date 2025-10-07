import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import './style.css'
import Layout from './Layout.vue'

const Theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(NolebaseGitChangelogPlugin)
  },
}

export default {
  extends: Theme, 
  Layout: Layout, 
  enhanceApp({app}) {
  }
}