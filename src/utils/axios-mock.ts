import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  mockLogin as originalMockLogin,
  mockRegister as originalMockRegister,
  mockLogout as originalMockLogout,
  mockIsLoggedIn as originalMockIsLoggedIn,
  mockGetCurrentUsername as originalMockGetCurrentUsername,
  getCurrentUserObj,
  mockGetUserAvatar
} from './mockserver'

// 创建 axios mock 实例
const mock = new MockAdapter(axios, { delayResponse: 500 }) // 500ms 延迟，模拟网络请求

// 模拟登录接口
mock.onPost('/api/auth/login').reply(async config => {
  try {
    const { username, password } = JSON.parse(config.data || '{}')
    const result = await originalMockLogin(username, password)
    return [200, result]
  } catch (error) {
    return [500, { success: false, message: '服务器错误' }]
  }
})

// 模拟注册接口
mock.onPost('/api/auth/register').reply(async config => {
  try {
    const { username, password } = JSON.parse(config.data || '{}')
    const result = await originalMockRegister(username, password)
    return [200, result]
  } catch (error) {
    return [500, { success: false, message: '服务器错误' }]
  }
})

// 模拟获取当前用户信息
mock.onGet('/api/auth/current').reply(() => {
  const user = getCurrentUserObj()
  if (user) {
    return [200, { success: true, data: user }]
  }
  return [401, { success: false, message: '未登录' }]
})

// 模拟退出登录
mock.onPost('/api/auth/logout').reply(() => {
  originalMockLogout()
  return [200, { success: true, message: '退出登录成功' }]
})

// 模拟获取用户头像
mock.onGet(/\/api\/auth\/avatar\/.+/).reply(config => {
  const username = config.url?.split('/').pop() || ''
  const avatar = mockGetUserAvatar(username)
  return [200, { success: true, data: { avatar } }]
})

// 验证是否登录
mock.onGet('/api/auth/check').reply(() => {
  const isLoggedIn = originalMockIsLoggedIn()
  return [200, { success: true, data: { isLoggedIn } }]
})

// 拦截所有其他 API 请求
mock.onAny(/\/api\/.*/).reply(config => {
  console.warn(`Mock Server: 未定义的 API 路由: ${config.method?.toUpperCase()} ${config.url}`)
  return [404, { success: false, message: 'API 未找到' }]
})

console.log('✅ Mock Server 已启动，拦截所有 /api/* 请求')

export default mock
