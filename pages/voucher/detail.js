const { getVoucherDetail, getVoucherQrCode } = require('../../api/voucher')

Page({
  data: {
    loading: true,
    detail: null,
    qrCode: '',
    statusMap: {
      0: { text: '未使用', color: '#2ecc71' },
      1: { text: '已使用', color: '#95a5a6' },
      2: { text: '已过期', color: '#e74c3c' }
    }
  },

  onLoad(options) {
    if (options.id) {
      this.loadVoucherDetail(options.id)
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

  async loadVoucherDetail(id) {
    try {
      this.setData({ loading: true })
      const detail = await getVoucherDetail(id)
      this.setData({ detail, loading: false })

      // 如果是未使用的电子券，加载二维码
      if (detail.status === 0) {
        this.loadQrCode(id)
      }
    } catch (error) {
      console.error('加载电子券详情失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  async loadQrCode(id) {
    try {
      const qrCode = await getVoucherQrCode(id)
      this.setData({ qrCode })
    } catch (error) {
      console.error('加载二维码失败:', error)
      wx.showToast({
        title: '二维码加载失败',
        icon: 'error'
      })
    }
  },

  previewQrCode() {
    if (this.data.qrCode) {
      wx.previewImage({
        urls: [this.data.qrCode]
      })
    }
  },

  getStatusText(status) {
    return this.data.statusMap[status]?.text || '未知状态'
  },

  getStatusColor(status) {
    return this.data.statusMap[status]?.color || '#999'
  },

  formatAmount(amount) {
    return (amount / 100).toFixed(2)
  },

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

  onShareAppMessage() {
    return {
      title: '电子券详情',
      path: `/pages/voucher/detail?id=${this.data.detail?.id || ''}`
    }
  }
}) 