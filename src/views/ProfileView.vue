<template>
  <div class="profile-container">
    <div class="auth-background">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
    </div>
    <el-card class="profile-card" shadow="hover">
      <div class="card-header">
        <h2>个人中心</h2>
        <el-button type="primary" size="default" @click="handleBack" circle>
          <el-icon><Back /></el-icon>
        </el-button>
      </div>

      <div class="profile-content">
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <el-avatar :size="100" :src="userAvatar">
              {{ username ? String(username).charAt(0).toUpperCase() : 'U' }}
            </el-avatar>
            <div class="status-dot"></div>
          </div>
          <p class="username-display">{{ username }}</p>
          <p class="status-badge">已登录</p>
        </div>

        <div class="info-section">
          <el-descriptions title="用户信息" :column="1" border class="info-descriptions">
            <el-descriptions-item label="用户名">
              <span class="info-value">{{ username }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">
              <span class="info-value">{{ registeredTime || '未知' }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="最后登录">
              <span class="info-value">{{ lastLoginTime || '未知' }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <div class="action-section">
          <el-button type="danger" plain @click="handleLogout" size="large" class="logout-btn">
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Back, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentUser, getUserAvatar, logoutUser } from '../utils/auth'

const router = useRouter()
const username = ref('')
const userAvatar = ref('')
const registeredTime = ref('')
const lastLoginTime = ref('')

onMounted(async () => {
  const currentUser = await getCurrentUser()
  username.value = currentUser || ''

  if (username.value) {
    userAvatar.value = await getUserAvatar(username.value)
  }
  // 获取注册时间和最后登录时间（简化处理）
  const registered = localStorage.getItem('registered_time')
  const lastLogin = localStorage.getItem('last_login_time')
  registeredTime.value = registered || new Date().toLocaleString()
  lastLoginTime.value = lastLogin || new Date().toLocaleString()
})

const handleBack = () => {
  router.push('/')
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      type: 'warning'
    })
    logoutUser()
    ElMessage.success('已退出登录')
    router.push('/login')
  } catch {
    // 取消操作
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 80px 20px 40px;
}

.auth-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
}

.gradient-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: float 10s ease-in-out infinite;
}

.circle-1 {
  width: 350px;
  height: 350px;
  background: rgba(255, 154, 158, 0.5);
  top: -120px;
  left: -120px;
  animation-delay: 0s;
}

.circle-2 {
  width: 450px;
  height: 450px;
  background: rgba(250, 208, 196, 0.5);
  bottom: -180px;
  right: -180px;
  animation-delay: 3s;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background: rgba(161, 140, 209, 0.5);
  top: 40%;
  left: 60%;
  animation-delay: 6s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(25px, -25px);
  }
  66% {
    transform: translate(-15px, 15px);
  }
}

.profile-card {
  width: 520px;
  border-radius: 24px;
  overflow: hidden;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.card-header h2 {
  margin: 0;
  color: #333;
  font-size: 26px;
  font-weight: 600;
}

.profile-content {
  padding: 10px 0;
}

.avatar-section {
  text-align: center;
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar-wrapper .el-avatar {
  border: 4px solid white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  animation: scaleIn 0.6s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.status-dot {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
  border: 3px solid white;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(82, 196, 26, 0);
  }
}

.username-display {
  font-size: 24px;
  font-weight: 600;
  margin: 18px 0 8px;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.status-badge {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
  color: white;
  font-size: 13px;
  font-weight: 500;
  border-radius: 20px;
  margin: 0;
  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3);
}

.info-section {
  margin-bottom: 35px;
}

.info-descriptions {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.info-descriptions .el-descriptions__header) {
  margin-bottom: 16px;
}

:deep(.info-descriptions .el-descriptions__title) {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

:deep(.info-descriptions .el-descriptions__label) {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  font-weight: 500;
  color: #666;
  padding: 14px 16px;
}

:deep(.info-descriptions .el-descriptions__content) {
  padding: 14px 16px;
}

.info-value {
  color: #333;
  font-weight: 500;
}

.action-section {
  text-align: center;
  padding-top: 15px;
}

.logout-btn {
  width: 200px;
  height: 48px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 24px;
  background: white;
  border: 2px solid #ff4d4f;
  color: #ff4d4f;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 77, 79, 0.3);
}

.logout-btn:active {
  transform: translateY(0);
}
</style>
