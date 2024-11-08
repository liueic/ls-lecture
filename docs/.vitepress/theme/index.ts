import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import {
  NolebaseUnlazyImg,
} from '@nolebase/vitepress-plugin-thumbnail-hash/client'
import '@nolebase/vitepress-plugin-thumbnail-hash/client/style.css'

const Theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(NolebaseGitChangelogPlugin)
    app.component('NolebaseUnlazyImg', NolebaseUnlazyImg)
  },
}

export default Theme