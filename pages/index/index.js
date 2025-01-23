// index.js
const app = getApp()

Page({
  onLoad() {
    // 检查是否已登录
    const token = app.globalData.token
    if (token) {
      // 已登录，跳转到电子券页面
      wx.switchTab({
        url: '/pages/voucher/index'
      })
    } else {
      // 未登录，跳转到登录页
      wx.redirectTo({
        url: '/pages/login/index'
      })
    }
  }
})
