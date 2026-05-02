<template>
  <el-sub-menu
    index="user-menu"
    popper-class="user-dropdown-popper"
    :hide-timeout="50"
    :show-timeout="50"
  >
    <template #title>
      <div class="user-avatar-wrapper">
        <el-avatar :size="36" :src="userAvatarUrl" :alt="`${username}的头像`">
          {{ username ? username.charAt(0).toUpperCase() : 'U' }}
        </el-avatar>
        <span class="username-text">{{ username }}</span>
      </div>
    </template>
    <el-menu-item index="/profile" @click="navigateToProfile">
      <el-icon><User /></el-icon>
      <span>用户中心</span>
    </el-menu-item>
    <el-menu-item index="/logout" @click="handleLogout">
      <el-icon><SwitchButton /></el-icon>
      <span>退出登录</span>
    </el-menu-item>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentUserDetail, logoutUser } from '../utils/auth'

const emit = defineEmits<{
  logout: []
}>()

const router = useRouter()
const username = ref('')
const userAvatarUrl = ref('')

onMounted(async () => {
  const user = await getCurrentUserDetail()
  if (user) {
    username.value = user.username
    userAvatarUrl.value = user.avatar || ''
  }
})

const navigateToProfile = () => {
  router.push('/profile')
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要退出登录吗？',
      '退出登录',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    await logoutUser()
    emit('logout')
    ElMessage.success('已退出登录')
    router.push('/login')
  } catch (error) {
    // 用户取消操作，不做任何事情
  }
}
</script>

<style scoped>
.user-avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0 10px;
  height: 100%;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-avatar-wrapper:hover {
  background-color: #f5f5f5;
}

.username-text {
  font-size: 14px;
  color: #303133;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.el-sub-menu__icon-arrow) {
  margin-left: 4px;
}
</style>