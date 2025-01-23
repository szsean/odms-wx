const { getRefuelRecords } = require('../../api/refuel')

Page({
  data: {
    loading: false,
    list: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
    hasMore: true
  },

  onLoad() {
    this.getList()
  },

  // 获取列表数据
  async getList() {
    if (this.data.loading || !this.data.hasMore) {
      return
    }

    this.setData({
      loading: true
    })

    try {
      const { data } = await getRefuelRecords({
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      })

      this.setData({
        list: [...this.data.list, ...data.records],
        total: data.total,
        hasMore: this.data.pageNum * this.data.pageSize < data.total
      })
    } catch (error) {
      console.error('获取加油记录失败:', error)
    } finally {
      this.setData({
        loading: false
      })
    }
  },

  // 下拉刷新
  async onPullDownRefresh() {
    this.setData({
      list: [],
      pageNum: 1,
      hasMore: true
    })
    await this.getList()
    wx.stopPullDownRefresh()
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getList()
    }
  },

  // 查看加油记录详情
  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/refuel/detail?id=${id}`
    })
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
  }
}) 