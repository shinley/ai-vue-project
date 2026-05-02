// Mock Server - 模拟后端 API 服务
export interface User {
  username: string
  password: string
  avatar?: string
}

const STORAGE_KEY_USERS = 'mock_users'
const STORAGE_KEY_CURRENT_USER = 'mock_current_user'

// 初始化默认用户
function initDefaultUsers() {
  const users = getUsers()
  if (users.length === 0) {
    // 添加默认用户
    users.push(
      { username: 'admin', password: '123456', avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c26a0b2c6f85852djpeg.jpeg' },
      { username: 'user', password: '123456', avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a496dd14d6c2jpeg.jpeg' }
    )
    saveUsers(users)
  }
}

function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY_USERS)
  return data ? JSON.parse(data) : []
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users))
}

function saveCurrentUser(username: string) {
  localStorage.setItem(STORAGE_KEY_CURRENT_USER, username)
  // 记录最后登录时间
  localStorage.setItem('last_login_time', new Date().toLocaleString())
}

function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEY_CURRENT_USER)
}

// 获取当前登录用户
export function getCurrentUserObj(): User | null {
  const username = localStorage.getItem(STORAGE_KEY_CURRENT_USER)
  if (!username) return null
  const users = getUsers()
  return users.find(u => u.username === username) || null
}

// 初始化
initDefaultUsers()

// Mock 登录
export async function mockLogin(username: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getUsers()
      const user = users.find(u => u.username === username && u.password === password)
      if (!user) {
        resolve({ success: false, message: '用户名或密码错误' })
      } else {
        saveCurrentUser(username)
        resolve({ success: true, message: '登录成功', user })
      }
    }, 500) // 模拟网络延迟
  })
}

// Mock 注册
export async function mockRegister(username: string, password: string): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getUsers()
      if (users.find(u => u.username === username)) {
        resolve({ success: false, message: '用户名已存在' })
      } else {
        users.push({ username, password, avatar: '' })
        saveUsers(users)
        // 记录注册时间
        localStorage.setItem('registered_time', new Date().toLocaleString())
        resolve({ success: true, message: '注册成功' })
      }
    }, 500)
  })
}

// Mock 退出登录
export function mockLogout() {
  clearCurrentUser()
}

// 检查是否登录
export function mockIsLoggedIn(): boolean {
  return !!localStorage.getItem(STORAGE_KEY_CURRENT_USER)
}

// 获取当前用户名
export function mockGetCurrentUsername(): string | null {
  return localStorage.getItem(STORAGE_KEY_CURRENT_USER)
}

// 获取用户头像
export function mockGetUserAvatar(username: string): string {
  const users = getUsers()
  const user = users.find(u => u.username === username)
  return user?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c26a0b2c6f85852djpeg.jpeg'
}
