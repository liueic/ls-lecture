<script setup>
import DefaultTheme from 'vitepress/theme'
import Twikoo from './components/Twikoo.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <div class="doc-comments-container">
        <Twikoo></Twikoo>
      </div>
    </template>
  </Layout>
</template>

<style>
/* 移除或注释掉不再使用的样式 */
/*
@media (min-width: 640px) {
  .home-comment-container {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .home-comment-container {
    padding: 0 64px;
  }
}

.home-comment-container .comment-container {
  margin: 0 auto;
  max-width: 1152px;
}
*/

/* 为文档页面的评论区添加样式 */
.doc-comments-container {
  margin-top: 64px; /* 在评论区上方添加外边距，与正文分开 */
  padding-top: 32px; /* 在评论区内部添加上内边距 */
  border-top: 1px solid var(--vp-c-divider); /* 添加一个顶部分隔线 */
}

.twikoo .el-loading-spinner .circular {
  margin-left: auto;
  margin-right: auto;
}
</style>