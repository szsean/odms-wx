const { request } = require('../utils/request')

// 获取加油记录列表
function getRefuelRecords(params) {
  return request({
    url: '/api/refuel/records',
    method: 'GET',
    data: params
  })
}

// 获取加油记录详情
function getRefuelDetail(id) {
  return request({
    url: `/api/refuel/records/${id}`,
    method: 'GET'
  })
}

module.exports = {
  getRefuelRecords,
  getRefuelDetail
} 