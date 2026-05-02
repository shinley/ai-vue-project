import axios from 'axios'
import type { User } from './mockserver'

// 登录接口
export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  user?: User
}

export async function apiLogin(data: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post('/api/auth/login', data)
  return response.data
}

// 注册接口
export interface RegisterRequest {
  username: string
  password: string
}

export interface RegisterResponse {
  success: boolean
  message: string
}

export async function apiRegister(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await axios.post('/api/auth/register', data)
  return response.data
}

// 退出登录
export interface LogoutResponse {
  success: boolean
  message: string
}

export async function apiLogout(): Promise<LogoutResponse> {
  const response = await axios.post('/api/auth/logout')
  return response.data
}

// 获取当前用户
export interface CurrentUserResponse {
  success: boolean
  data?: User
  message?: string
}

export async function apiGetCurrentUser(): Promise<CurrentUserResponse> {
  const response = await axios.get('/api/auth/current')
  return response.data
}

// 检查登录状态
export interface CheckLoginResponse {
  success: boolean
  data: {
    isLoggedIn: boolean
  }
}

export async function apiCheckLogin(): Promise<CheckLoginResponse> {
  const response = await axios.get('/api/auth/check')
  return response.data
}

// 获取用户头像
export interface AvatarResponse {
  success: boolean
  data: {
    avatar: string
  }
}

export async function apiGetUserAvatar(username: string): Promise<AvatarResponse> {
  const response = await axios.get(`/api/auth/avatar/${username}`)
  return response.data
}
