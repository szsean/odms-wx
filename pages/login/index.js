import { sendCode, loginByCode, loginByPassword } from '../../api/user'

const app = getApp()

Page({
  data: {
    loginType: 'code', // code: 验证码登录, password: 密码登录
    phone: '',
    code: '',
    password: '',
    countdown: 0,
    submitLoading: false
  },

  // 切换登录方式
  switchLoginType() {
    this.setData({
      loginType: this.data.loginType === 'code' ? 'password' : 'code'
    })
  },

  // 输入手机号
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 输入验证码
  inputCode(e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 输入密码
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 发送验证码
  async sendCode() {
    if (this.data.countdown > 0) {
      return
    }

    const phone = this.data.phone.trim()
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    // 模拟发送验证码
    wx.showToast({
      title: '验证码发送成功',
      icon: 'success'
    })
    
    this.startCountdown()
  },

  // 开始倒计时
  startCountdown() {
    this.setData({
      countdown: 60
    })

    const timer = setInterval(() => {
      if (this.data.countdown <= 1) {
        clearInterval(timer)
      }
      this.setData({
        countdown: this.data.countdown - 1
      })
    }, 1000)
  },

  // 提交登录
  async submitLogin() {
    const phone = this.data.phone.trim()
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    if (this.data.loginType === 'code') {
      if (!this.data.code) {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
        return
      }
    } else {
      if (!this.data.password) {
        wx.showToast({
          title: '请输入密码',
          icon: 'none'
        })
        return
      }
    }

    this.setData({ submitLoading: true })

    try {
      // 模拟登录成功
      const mockUserInfo = {
        id: 1,
        name: '张三',
        phone: phone,
        enterpriseName: 'XX运输公司',
        enterprisePhone: '0571-88888888',
        enterpriseAddress: '浙江省杭州市西湖区xxx路xx号',
        employeeNo: 'D001',
        createTime: '2024-01-01'
      }
      
      // 保存登录信息
      wx.setStorageSync('token', 'mock_token_' + Date.now())
      wx.setStorageSync('userInfo', mockUserInfo)
      
      // 获取全局App实例
      const app = getApp()
      app.globalData.token = 'mock_token_' + Date.now()
      app.globalData.userInfo = mockUserInfo

      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })

      // 跳转到电子券页面
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/voucher/index'
        })
      }, 1500)
    } catch (error) {
      console.error('登录失败:', error)
      wx.showToast({
        title: '登录失败',
        icon: 'error'
      })
    } finally {
      this.setData({ submitLoading: false })
    }
  },

  // 跳转到重置密码页面
  goResetPassword() {
    wx.navigateTo({
      url: '/pages/user/password'
    })
  }
}) 