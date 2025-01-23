const { getUserInfo, logout } = require('../../api/user')

Page({
  data: {
    loading: true,
    userInfo: null
  },

  onLoad() {
    this.loadUserInfo()
  },

  async loadUserInfo() {
    try {
      this.setData({ loading: true })
      const userInfo = await getUserInfo()
      this.setData({ userInfo, loading: false })
    } catch (error) {
      console.error('加载用户信息失败:', error)
      this.setData({ loading: false })
    }
  },

  // 修改密码
  goChangePassword() {
    wx.navigateTo({
      url: '/pages/user/password'
    })
  },

  // 退出登录
  async handleLogout() {
    try {
      await wx.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        confirmText: '退出',
        confirmColor: '#e74c3c'
      })

      await logout()
      
      // 清除本地存储的token和用户信息
      wx.removeStorageSync('token')
      wx.removeStorageSync('userInfo')

      // 重定向到登录页
      wx.reLaunch({
        url: '/pages/login/index'
      })
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  },

  // 拨打电话
  makePhoneCall() {
    if (this.data.userInfo?.enterprisePhone) {
      wx.makePhoneCall({
        phoneNumber: this.data.userInfo.enterprisePhone
      })
    }
  },

  onPullDownRefresh() {
    this.loadUserInfo()
    wx.stopPullDownRefresh()
  }
}) 