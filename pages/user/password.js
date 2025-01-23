const { updatePassword } = require('../../api/user')

Page({
  data: {
    loading: false,
    form: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },

  // 输入旧密码
  inputOldPassword(e) {
    this.setData({
      'form.oldPassword': e.detail.value
    })
  },

  // 输入新密码
  inputNewPassword(e) {
    this.setData({
      'form.newPassword': e.detail.value
    })
  },

  // 确认新密码
  inputConfirmPassword(e) {
    this.setData({
      'form.confirmPassword': e.detail.value
    })
  },

  // 提交表单
  async handleSubmit() {
    const { oldPassword, newPassword, confirmPassword } = this.data.form

    // 表单验证
    if (!oldPassword) {
      wx.showToast({
        title: '请输入原密码',
        icon: 'none'
      })
      return
    }

    if (!newPassword) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
      return
    }

    if (newPassword.length < 6) {
      wx.showToast({
        title: '新密码不能少于6位',
        icon: 'none'
      })
      return
    }

    if (newPassword !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
      return
    }

    try {
      this.setData({ loading: true })

      await updatePassword({
        oldPassword,
        newPassword
      })

      wx.showToast({
        title: '修改成功',
        icon: 'success'
      })

      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    } catch (error) {
      console.error('修改密码失败:', error)
    } finally {
      this.setData({ loading: false })
    }
  }
}) 