import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";
import { ElMessage } from "element-plus";

//axios配置
const config = {
  //域名
  baseURL: "http://localhost:5731",
  //连接超时时间
  timeout: 10000,
};
//定义返回值类型
//传递T 默认any
export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}
//定义类
class Http {
  private instance: AxiosInstance;
  //构造函数进行初始化
  constructor(config: AxiosRequestConfig) {
    //实例化
    this.instance = axios.create(config);
    //配置拦截器
    this.interceptors();
  }
  private interceptors() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Do something before request is sent
        const token = "";
        if (token) {
          config.headers!["token"] = token;
        }
        return Promise.reject(config);
      },
      (error: any) => {
        // Do something with request error
        error.data = {};
        error.data.msg = "服务异常，请联系管理员";
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.data.code != 200) {
          ElMessage.error(res.data.msg || "服务器出错!");
          return Promise.reject(res.data.msg || "服务器出错!");
        } else {
          return res.data;
        }
      },
      (error: any) => {
        console.log("进入错误");
        error.data = {};
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.data.msg = "错误请求";
              ElMessage.error(error.data.msg);
              break;
            case 401:
              error.data.msg = "未授权，请重新登录";
              ElMessage.error(error.data.msg);
              break;
            case 403:
              error.data.msg = "拒绝访问";
              ElMessage.error(error.data.msg);
              break;
            case 404:
              error.data.msg = "请求错误,未找到该资源";
              ElMessage.error(error.data.msg);
              break;
            case 405:
              error.data.msg = "请求方法未允许";
              ElMessage.error(error.data.msg);
              break;
            case 408:
              error.data.msg = "请求超时";
              ElMessage.error(error.data.msg);
              break;
            case 500:
              error.data.msg = "服务器端出错";
              ElMessage.error(error.data.msg);
              break;
            case 501:
              error.data.msg = "网络未实现";
              ElMessage.error(error.data.msg);
              break;
            case 502:
              error.data.msg = "网络错误";
              ElMessage.error(error.data.msg);
              break;
            case 503:
              error.data.msg = "服务不可用";
              ElMessage.error(error.data.msg);
              break;
            case 504:
              error.data.msg = "网络超时";
              ElMessage.error(error.data.msg);
              break;
            case 505:
              error.data.msg = "http版本不支持该请求";
              ElMessage.error(error.data.msg);
              break;
            default:
              error.data.msg = `连接错误${error.response.status}`;
              ElMessage.error(error.data.msg);
          }
        } else {
          error.data.msg = "连接到服务器失败";
          ElMessage.error(error.data.msg);
        }
        return Promise.reject(error);
      }
    );
  }
  //请求的封装 Promise<T>返回值类型
  get<T = Result>(url: string, params?: object): Promise<T> {
    return this.instance.get(url, { params });
  }
  post<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.post(url, { data });
  }
  put<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.put(url, { data });
  }
  delete<T = Result>(url: string): Promise<T> {
    return this.instance.delete(url);
  }
}
export default Http;
