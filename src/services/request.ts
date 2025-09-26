//封装基本网络请求

import Taro from "@tarojs/taro";

const BASE_URL = "http://localhost:3000";


const interceptor = (chain) => {
  const requestParams = chain.requestParams;
  const { method, data, url } = requestParams;

  console.log(`http ${method || 'GET'} --> ${url} data: `, data);

  // 统一添加请求头，例如 Content-Type 和 token
  requestParams.header = {
    ...requestParams.header,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Taro.getStorageSync('token') || ''}` // 从缓存中获取 token
  };

  return chain.proceed(requestParams).then(res => {
    console.log(`http <-- ${url} result:`, res.data);

    // 处理 HTTP 错误
    if (res.statusCode < 200 || res.statusCode >= 300) {
      Taro.showToast({
        title: `请求错误: ${res.statusCode}`,
        icon: 'none'
      });
      return Promise.reject(res);
    }

    // 处理业务逻辑错误（假设后端通过 code 字段表示状态）
    // code: 0 表示成功
    if (res.data.code !== 0) {
      // 例如 token 失效，跳转到登录页
      if (res.data.code === 401) {
        Taro.navigateTo({ url: '/pages/login/index' });
        return Promise.reject(res.data);
      }
      // 其他业务错误，显示后端返回的提示信息
      Taro.showToast({
        title: res.data.message || '服务开小差啦~',
        icon: 'none'
      });
      return Promise.reject(res.data);
    }

    return res.data;
  }).catch(err => {
    // 处理网络请求失败等异常
    Taro.showToast({
      title: '网络连接异常',
      icon: 'none'
    });
    return Promise.reject(err);
  });
};

Taro.addInterceptor(interceptor);

/**
 * 发起一个网络请求
 * @param options Taro.request 的参数
 * @returns Promise 对象，成功时返回后端数据，失败时返回错误信息
 */
const request = (options: Taro.request.Option) => {
  return Taro.request({
    ...options,
    url: BASE_URL + options.url,
    timeout: 10000, // 10秒超时
  });
};

export default request;
