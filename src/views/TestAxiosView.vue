<template>
  <div class="test-container">
    <el-card class="test-card">
      <template #header>
        <h2>Axios Mock 测试页面</h2>
      </template>

      <div class="test-section">
        <h3>1. 登录测试</h3>
        <el-form :model="loginForm" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username" placeholder="admin 或 user" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" placeholder="123456" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="testLogin" :loading="loading.login">
              测试登录
            </el-button>
          </el-form-item>
        </el-form>
        <div v-if="results.login" class="result">
          <el-alert :type="results.login.success ? 'success' : 'error'">
            <strong>结果:</strong> {{ results.login.message }}<br>
            <span v-if="results.login.user">用户: {{ results.login.user.username }}</span>
          </el-alert>
        </div>
      </div>

      <el-divider />

      <div class="test-section">
        <h3>2. 注册测试</h3>
        <el-form :model="registerForm" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="registerForm.username" placeholder="新用户名" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="registerForm.password" type="password" placeholder="密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="testRegister" :loading="loading.register">
              测试注册
            </el-button>
          </el-form-item>
        </el-form>
        <div v-if="results.register" class="result">
          <el-alert :type="results.register.success ? 'success' : 'error'">
            <strong>结果:</strong> {{ results.register.message }}
          </el-alert>
        </div>
      </div>

      <el-divider />

      <div class="test-section">
        <h3>3. 获取当前用户</h3>
        <el-button @click="testGetCurrentUser" :loading="loading.currentUser">
          获取当前用户信息
        </el-button>
        <div v-if="results.currentUser" class="result">
          <el-alert type="info">
            <strong>当前用户:</strong> {{ results.currentUser.data?.username || '未登录' }}
          </el-alert>
        </div>
      </div>

      <el-divider />

      <div class="test-section">
        <h3>4. 检查登录状态</h3>
        <el-button @click="testCheckLogin" :loading="loading.checkLogin">
          检查是否登录
        </el-button>
        <div v-if="results.checkLogin" class="result">
          <el-alert :type="results.checkLogin.data.isLoggedIn ? 'success' : 'warning'">
            <strong>登录状态:</strong> {{ results.checkLogin.data.isLoggedIn ? '已登录' : '未登录' }}
          </el-alert>
        </div>
      </div>

      <el-divider />

      <div class="test-section">
        <h3>5. 退出登录</h3>
        <el-button type="danger" @click="testLogout" :loading="loading.logout">
          退出登录
        </el-button>
        <div v-if="results.logout" class="result">
          <el-alert type="success">
            <strong>结果:</strong> {{ results.logout.message }}
          </el-alert>
        </div>
      </div>

      <el-divider />

      <div class="test-section">
        <h3>6. 获取用户头像</h3>
        <el-form :model="avatarForm" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="avatarForm.username" placeholder="admin 或 user" />
          </el-form-item>
          <el-form-item>
            <el-button @click="testGetAvatar" :loading="loading.avatar">
              获取头像
            </el-button>
          </el-form-item>
        </el-form>
        <div v-if="results.avatar" class="result">
          <el-alert type="info">
            <strong>头像 URL:</strong><br>
            <img :src="results.avatar.data.avatar" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%; margin-top: 10px;" />
          </el-alert>
        </div>
      </div>

      <el-divider />

      <div class="tips">
        <h3>🔍 浏览器开发者工具查看请求：</h3>
        <ol>
          <li>按 F12 打开开发者工具</li>
          <li>切换到 Network (网络) 标签</li>
          <li>点击测试按钮，你会看到 /api/* 的请求</li>
          <li>虽然请求被 mock 拦截，但可以在控制台看到完整的请求/响应流程</li>
        </ol>
        <p><strong>控制台也会显示:</strong> "✅ Mock Server 已启动，拦截所有 /api/* 请求"</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const loading = reactive({
  login: false,
  register: false,
  currentUser: false,
  checkLogin: false,
  logout: false,
  avatar: false
})

const results = reactive({
  login: null as any,
  register: null as any,
  currentUser: null as any,
  checkLogin: null as any,
  logout: null as any,
  avatar: null as any
})

const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

const registerForm = reactive({
  username: '',
  password: ''
})

const avatarForm = reactive({
  username: 'admin'
})

// 测试登录
const testLogin = async () => {
  loading.login = true
  try {
    const response = await axios.post('/api/auth/login', {
      username: loginForm.username,
      password: loginForm.password
    })
    results.login = response.data
    ElMessage.success('登录请求成功')
  } catch (error: any) {
    results.login = error.response?.data || { success: false, message: '请求失败' }
    ElMessage.error('登录请求失败')
  } finally {
    loading.login = false
  }
}

// 测试注册
const testRegister = async () => {
  loading.register = true
  try {
    const response = await axios.post('/api/auth/register', {
      username: registerForm.username,
      password: registerForm.password
    })
    results.register = response.data
    ElMessage.success('注册请求成功')
  } catch (error: any) {
    results.register = error.response?.data || { success: false, message: '请求失败' }
    ElMessage.error('注册请求失败')
  } finally {
    loading.register = false
  }
}

// 测试获取当前用户
const testGetCurrentUser = async () => {
  loading.currentUser = true
  try {
    const response = await axios.get('/api/auth/current')
    results.currentUser = response.data
    ElMessage.success('获取用户信息成功')
  } catch (error: any) {
    results.currentUser = error.response?.data || { success: false, message: '请求失败' }
    ElMessage.error('获取用户信息失败')
  } finally {
    loading.currentUser = false
  }
}

// 测试检查登录状态
const testCheckLogin = async () => {
  loading.checkLogin = true
  try {
    const response = await axios.get('/api/auth/check')
    results.checkLogin = response.data
    ElMessage.success('检查登录状态成功')
  } catch (error: any) {
    results.checkLogin = error.response?.data || { success: false, message: '请求失败' }
    ElMessage.error('检查登录状态失败')
  } finally {
    loading.checkLogin = false
  }
}

// 测试退出登录
const testLogout = async () => {
  loading.logout = true
  try {
    const response = await axios.post('/api/auth/logout')
    results.logout = response.data
    ElMessage.success('退出登录成功')
  } catch (error: any) {
    results.logout = error.response?.data || { success: false, message: '请求失败' }
    ElMessage.error('退出登录失败')
  } finally {
    loading.logout = false
  }
}

// 测试获取头像
const testGetAvatar = async () => {
  loading.avatar = true
  try {
    const response = await axios.get(`/api/auth/avatar/${avatarForm.username}`)
    results.avatar = response.data
    ElMessage.success('获取头像成功')
  } catch (error: any) {
    results.avatar = error.response?.data || { success: false, message: '请求失败' }
    ElMessage.error('获取头像失败')
  } finally {
    loading.avatar = false
  }
}
</script>

<style scoped>
.test-container {
  padding: 20px;
  min-height: calc(100vh - 56px);
  padding-top: 56px;
  background: #f5f7fa;
}

.test-card {
  max-width: 800px;
  margin: 0 auto;
}

.test-section {
  margin-bottom: 20px;
}

.result {
  margin-top: 15px;
}

.tips {
  background: #e3f2fd;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}

.tips h3 {
  margin-top: 0;
  color: #1976d2;
}

.tips ol {
  margin: 10px 0;
  padding-left: 20px;
}

.tips li {
  margin-bottom: 5px;
}
</style>
