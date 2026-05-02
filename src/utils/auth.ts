// Auth 模块 - 使用 axios 调用 mock API
import {
  apiLogin,
  apiRegister,
  apiLogout,
  apiGetCurrentUser,
  apiCheckLogin,
  apiGetUserAvatar,
  type LoginRequest,
  type RegisterRequest
} from '../api'
import type { User } from './mockserver'

// 登录
export async function loginUser(username: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const result = await apiLogin({ username, password })
    return result
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || '网络请求失败'
    }
  }
}

// 注册
export async function registerUser(username: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    const result = await apiRegister({ username, password })
    return result
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || '网络请求失败'
    }
  }
}

// 退出登录
export async function logoutUser(): Promise<void> {
  try {
    await apiLogout()
  } catch (error) {
    console.error('退出登录失败:', error)
  }
}

// 是否登录
export async function isLoggedIn(): Promise<boolean> {
  try {
    const result = await apiCheckLogin()
    return result.data.isLoggedIn
  } catch (error) {
    return false
  }
}

// 获取当前用户
export async function getCurrentUser(): Promise<string | null> {
  try {
    const result = await apiGetCurrentUser()
    return result.data?.username || null
  } catch (error) {
    return null
  }
}

// 获取当前用户详情
export async function getCurrentUserDetail(): Promise<User | null> {
  try {
    const result = await apiGetCurrentUser()
    return result.data || null
  } catch (error) {
    return null
  }
}

// 获取用户头像
export async function getUserAvatar(username: string): Promise<string> {
  try {
    const result = await apiGetUserAvatar(username)
    return result.data.avatar
  } catch (error) {
    // 返回默认头像
    return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c26a0b2c6f85852djpeg.jpeg'
  }
}
