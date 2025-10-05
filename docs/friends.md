---
page: true
title: 友情链接
description: 与我们交换友情链接
---

# 友情链接

欢迎交换友情链接！如果您也有技术博客或个人网站，可以通过以下方式联系我们添加友链。

<div class="friends-grid">

<div class="friend-card">
  <div class="friend-avatar">
    <img src="https://s3.juniortree.com/pic/2025/09/c93639947bdf6f3bc87bd18ed6b283ea.webp" alt="小树博客" />
  </div>
  <div class="friend-info">
    <h3><a href="https://www.juniortree.com" target="_blank">小树的博客</a></h3>
    <p>你应当选择你真正热爱的</p>
  </div>
</div>

<div class="friend-card">
  <div class="friend-avatar">
    <img src="https://s3.juniortree.com/pic/2025/10/8ef38a37a9545728cc8bc0ccb47e6856.webp" alt="Caimeo博客" />
  </div>
  <div class="friend-info">
    <h3><a href="https://caimeo.world" target="_blank">The rabbit Hole</a></h3>
    <p>Collection of my notes and posts on various topics in CS, Math, Physics, and PL Theory.</p>
  </div>
</div>

</div>

---

## 交换友链

如果您希望添加友链，请提供以下信息：

- 网站名称
- 网站地址
- 网站描述（一句话简介）
- 网站头像链接

<style>
.friends-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.friend-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.friend-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.friend-avatar {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--vp-c-border);
}

.friend-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.friend-info {
  flex: 1;
}

.friend-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.friend-info h3 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.friend-info h3 a:hover {
  color: var(--vp-c-brand);
}

.friend-info p {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.friend-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .friend-card {
    flex-direction: column;
    text-align: center;
  }

  .friend-tags {
    justify-content: center;
  }
}
</style>