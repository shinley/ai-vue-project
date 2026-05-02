<template>
  <el-menu
    :default-active="activeIndex"
    class="navbar"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <div class="logo">
      <h2>百战程序员</h2>
    </div>
    <div class="flex-grow" />
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/about">关于我们</el-menu-item>
    <el-menu-item index="/courses">课程介绍</el-menu-item>
    <el-menu-item index="/features">特色优势</el-menu-item>
    <el-menu-item index="/contact">联系我们</el-menu-item>

    <!-- 用户头像下拉菜单 -->
    <UserAvatarDropdown v-if="isLoggedIn" @logout="handleUserLogout" />

    <!-- 未登录时只显示登录按钮 -->
    <template v-else>
      <el-menu-item index="/login">登录</el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserAvatarDropdown from './UserAvatarDropdown.vue'
import { apiCheckLogin } from '../api'

const route = useRoute()
const router = useRouter()
const activeIndex = ref('/')
const isLoggedIn = ref(false)

// 监听路由变化更新激活菜单项
watch(
  () => route.path,
  async (newPath) => {
    activeIndex.value = newPath
    const result = await apiCheckLogin()
    isLoggedIn.value = result.data.isLoggedIn
  },
  { immediate: true }
)

// 初始化
onMounted(async () => {
  const result = await apiCheckLogin()
  isLoggedIn.value = result.data.isLoggedIn
})

const handleSelect = (key: string) => {
  if (key !== '/user-menu' && key !== '/logout') {
    router.push(key)
  }
}

const handleUserLogout = () => {
  isLoggedIn.value = false
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding-right: 20px;
  background-color: white;
}

.logo h2 {
  color: #409eff;
  margin: 0;
  padding: 0 20px;
}

.flex-grow {
  flex-grow: 1;
}
</style>
