<template>
  <div class="auth-container">
    <div class="auth-background">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
    </div>
    <el-card class="auth-card" shadow="hover">
      <div class="card-header">
        <div class="logo-icon">
          <el-icon :size="40"><User /></el-icon>
        </div>
        <h2>欢迎回来</h2>
        <p class="subtitle">登录您的账户继续使用</p>
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="0">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            size="large"
            clearable
          >
            <template #prefix>
              <el-icon class="input-icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
            clearable
          >
            <template #prefix>
              <el-icon class="input-icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha" v-if="showCaptcha">
          <div class="captcha-input">
            <el-input
              v-model="form.captcha"
              placeholder="请输入验证码"
              maxlength="4"
              size="large"
              clearable
            />
            <div class="captcha-img" @click="refreshCaptcha">
              {{ captchaText }}
            </div>
          </div>
        </el-form-item>
        <div class="form-options">
          <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleLogin"
            :loading="loading"
            size="large"
            class="submit-btn"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
        <div class="footer-links">
          <span>还没有账号？</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { loginUser, getCurrentUserDetail } from '../utils/auth'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)
const showCaptcha = ref(false)
const captchaText = ref('')
const redirect = computed(() => router.currentRoute.value.query.redirect as string)

// 生成随机验证码
const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const refreshCaptcha = () => {
  captchaText.value = generateCaptcha()
}

// 初始验证码
refreshCaptcha()

const form = reactive({
  username: '',
  password: '',
  captcha: '',
  rememberMe: false
})

// 初始化时从 localStorage 恢复用户名
onMounted(() => {
  const savedUsername = localStorage.getItem('saved_username')
  if (savedUsername) {
    form.username = savedUsername
    form.rememberMe = true
  }
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  // 验证码校验
  if (showCaptcha.value && form.captcha.toUpperCase() !== captchaText.value.toUpperCase()) {
    ElMessage.error('验证码错误')
    refreshCaptcha()
    return
  }

  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const result = await loginUser(form.username, form.password)
    if (result.success) {
      ElMessage.success(result.message)
      // 记住用户名
      if (form.rememberMe) {
        localStorage.setItem('saved_username', form.username)
      } else {
        localStorage.removeItem('saved_username')
      }
      // 跳转到目标页面或首页
      router.push(redirect.value || '/')
    } else {
      ElMessage.error(result.message)
      // 验证失败时显示验证码
      if (form.username && form.password) {
        showCaptcha.value = true
        refreshCaptcha()
      }
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.auth-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: float 8s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: rgba(255, 107, 107, 0.5);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: rgba(78, 205, 196, 0.5);
  bottom: -150px;
  right: -150px;
  animation-delay: 2s;
}

.circle-3 {
  width: 250px;
  height: 250px;
  background: rgba(255, 234, 167, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, -20px);
  }
}

.auth-card {
  width: 450px;
  border-radius: 20px;
  overflow: hidden;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
}

.logo-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(102, 126, 234, 0);
  }
}

.card-header h2 {
  margin: 0 0 10px;
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  margin: 0;
  color: #999;
  font-size: 14px;
}

.input-icon {
  color: #999;
  font-size: 18px;
}

:deep(.el-input__wrapper) {
  border-radius: 12px;
  padding: 10px 15px;
  transition: all 0.3s;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.3);
}

.captcha-input {
  display: flex;
  gap: 15px;
}

.captcha-input :deep(.el-input) {
  flex: 1;
}

.captcha-img {
  flex-shrink: 0;
  width: 120px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 4px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  user-select: none;
}

.captcha-img:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(240, 147, 251, 0.4);
}

.form-options {
  margin-bottom: 20px;
}

:deep(.el-checkbox__label) {
  color: #666;
  font-size: 14px;
}

.submit-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.footer-links {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.footer-links a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #764ba2;
  text-decoration: underline;
}
</style>