import ApiService from "@/utils/request";
import type { LoginParam } from "@/type/loginModel";
//获取验证码
export const getImageApi = () => {
  return ApiService.post("/api/login/image");
};
//登录
export const login = (param: LoginParam) => {
  return ApiService.post("/api/login/login", param);
};