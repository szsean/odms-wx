import { getVoucherList } from '../../api/voucher'

Page({
  data: {
    loading: false,
    status: 0, // 0: 未使用, 1: 已使用, 2: 已过期
    list: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
    hasMore: true
  },

  onLoad() {
    this.getList()
  },

  // 切换状态
  switchStatus(e) {
    const status = Number(e.currentTarget.dataset.status)
    if (status === this.data.status) {
      return
    }
    this.setData({
      status,
      list: [],
      pageNum: 1,
      hasMore: true
    })
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
      const { data } = await getVoucherList({
        status: this.data.status,
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      })

      this.setData({
        list: [...this.data.list, ...data.records],
        total: data.total,
        hasMore: this.data.pageNum * this.data.pageSize < data.total
      })
    } catch (error) {
      console.error('获取电子券列表失败:', error)
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

  // 查看电子券详情
  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/voucher/detail?id=${id}`
    })
  },

  // 格式化金额
  formatAmount(amount) {
    return amount.toFixed(2)
  },

  // 格式化日期
  formatDate(date) {
    return date.split(' ')[0]
  }
}) 