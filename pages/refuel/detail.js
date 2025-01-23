const { getRefuelDetail } = require('../../api/refuel')

Page({
  data: {
    loading: true,
    detail: null
  },

  onLoad(options) {
    if (options.id) {
      this.loadRefuelDetail(options.id)
    } else {
      wx.showToast({
        title: '参数错误',
        icon: 'error'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  async loadRefuelDetail(id) {
    try {
      this.setData({ loading: true })
      const detail = await getRefuelDetail(id)
      this.setData({ detail, loading: false })
    } catch (error) {
      console.error('加载加油记录详情失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  // 格式化金额
  formatAmount(amount) {
    return (amount / 100).toFixed(2)
  },

  // 格式化日期时间
  formatDateTime(timestamp) {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  },

  // 查看电子券详情
  goVoucherDetail() {
    if (this.data.detail?.voucherId) {
      wx.navigateTo({
        url: `/pages/voucher/detail?id=${this.data.detail.voucherId}`
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '加油记录详情',
      path: `/pages/refuel/detail?id=${this.data.detail?.id || ''}`
    }
  }
}) 