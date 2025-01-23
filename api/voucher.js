import request from '../utils/request'

// 获取电子券列表
export function getVoucherList(params) {
  return request({
    url: '/voucher/list',
    method: 'GET',
    data: params
  })
}

// 获取电子券详情
export function getVoucherDetail(id) {
  return request({
    url: `/voucher/${id}`,
    method: 'GET'
  })
}

// 获取电子券二维码
export function getVoucherQrCode(id) {
  return request({
    url: `/voucher/${id}/qrcode`,
    method: 'GET'
  })
}

// 获取电子券使用记录
export function getVoucherRecords(params) {
  return request({
    url: '/voucher/records',
    method: 'GET',
    data: params
  })
}

// 获取加油记录
export function getRefuelRecords(params) {
  return request({
    url: '/refuel/records',
    method: 'GET',
    data: params
  })
} 