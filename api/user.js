const { request } = require('../utils/request')

// 发送验证码
export function sendCode(data) {
  return request({
    url: '/auth/code',
    method: 'POST',
    data
  })
}

// 验证码登录
export function loginByCode(data) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

// 密码登录
export function loginByPassword(data) {
  return request({
    url: '/auth/login/password',
    method: 'POST',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'GET'
  })
}

// 修改密码
export function updatePassword(data) {
  return request({
    url: '/api/user/password',
    method: 'PUT',
    data
  })
}

// 重置密码
export function resetPassword(data) {
  return request({
    url: '/auth/password/reset',
    method: 'POST',
    data
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'POST'
  })
}

module.exports = {
  getUserInfo,
  updatePassword,
  logout
} 