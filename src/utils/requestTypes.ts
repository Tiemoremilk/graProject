/**
 * 请求结果
 */
export class ResultModel {
  // 结果集
  data?: object;
  // 状态码
  code?: number;
  // 请求消息
  message?: string;
}

/**
 * 基础请求对象
 */
export class BaseRequest {
  public url: string;
  public data: object | any;

  constructor(url: string, data: object = {}) {
    this.url = url;
    this.data = data;
  }
}

/**
 * 请求配置
 */
export class requestConfig {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  public readonly baseURL: string;
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  public readonly timeout: number;

  constructor() {
    this.baseURL = import.meta.env.VITE_HOST_API;
    this.timeout = 3000;
  }
}
