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
      loginType: this.data.loginType === 'code' ? 'password' : 'code',
      phone: '',
      code: '',
      password: ''
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

    // 验证手机号
    const phone = this.data.phone.trim()
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    try {
      await sendCode({ phone })
      wx.showToast({
        title: '验证码已发送',
        icon: 'success'
      })
      // 开始倒计时
      this.setData({
        countdown: 60
      })
      this.startCountdown()
    } catch (error) {
      console.error('发送验证码失败:', error)
    }
  },

  // 倒计时
  startCountdown() {
    if (this.data.countdown <= 0) {
      return
    }
    setTimeout(() => {
      this.setData({
        countdown: this.data.countdown - 1
      })
      this.startCountdown()
    }, 1000)
  },

  // 提交登录
  async submitLogin() {
    if (this.data.submitLoading) {
      return
    }

    // 验证手机号
    const phone = this.data.phone.trim()
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    if (this.data.loginType === 'code') {
      // 验证码登录
      const code = this.data.code.trim()
      if (!code) {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
        return
      }
      if (!/^\d{6}$/.test(code)) {
        wx.showToast({
          title: '验证码格式不正确',
          icon: 'none'
        })
        return
      }

      this.setData({
        submitLoading: true
      })
      try {
        const res = await loginByCode({
          phone,
          code
        })
        // 保存token和用户信息
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('userInfo', res.data.userInfo)
        app.globalData.token = res.data.token
        app.globalData.userInfo = res.data.userInfo
        // 跳转到电子券页面
        wx.switchTab({
          url: '/pages/voucher/index'
        })
      } catch (error) {
        console.error('登录失败:', error)
        this.setData({
          submitLoading: false
        })
      }
    } else {
      // 密码登录
      const password = this.data.password.trim()
      if (!password) {
        wx.showToast({
          title: '请输入密码',
          icon: 'none'
        })
        return
      }
      if (password.length < 6) {
        wx.showToast({
          title: '密码不能少于6位',
          icon: 'none'
        })
        return
      }

      this.setData({
        submitLoading: true
      })
      try {
        const res = await loginByPassword({
          phone,
          password
        })
        // 保存token和用户信息
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('userInfo', res.data.userInfo)
        app.globalData.token = res.data.token
        app.globalData.userInfo = res.data.userInfo
        // 跳转到电子券页面
        wx.switchTab({
          url: '/pages/voucher/index'
        })
      } catch (error) {
        console.error('登录失败:', error)
        this.setData({
          submitLoading: false
        })
      }
    }
  },

  // 跳转到重置密码页面
  goResetPassword() {
    wx.navigateTo({
      url: '/pages/user/password?type=reset'
    })
  }
}) 