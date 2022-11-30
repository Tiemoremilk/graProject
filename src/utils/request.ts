import axios from "axios";
import { requestConfig, BaseRequest, ResultModel } from "./requestTypes";
const service = axios.create(new requestConfig());

// 添加请求拦截器
service.interceptors.request.use(
  function (config: any) {
    // 请求之前附带token信息
    config.headers.Authorization = `Bearer ` + "xxxx";

    return config;
  },
  function (error) {
    // 对请求错误做些什么，提示错误信息
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么,提示成功信息
    const res = <ResultModel>response.data;
    return res;
  },
  function (error: any) {
    // 对响应错误做点什么,提示错误信息
    return Promise.reject(error);
  }
);
