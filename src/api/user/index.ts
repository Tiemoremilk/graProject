import type {
  AddUserModel,
  ListParam,
  resetUserPassword,
} from "./../../type/userModel";
import ApiService from "@/utils/request";

export const getSelectApi = () => {
  return ApiService.get("api/role/getListSelect");
};
export const addApi = (param: AddUserModel) => {
  return ApiService.post("api/user", param);
};
export const getListApi = (params: ListParam) => {
  return ApiService.get("api/user/userList", params);
};
export const editApi = (params: AddUserModel) => {
  return ApiService.put("/api/user", params);
};
export const deleteApi = (userId: string) => {
  return ApiService.delete(`/api/user/${userId}`);
};
export const getRoleByUserIdApi = (userId: string) => {
  return ApiService.get("api/user/getRoleByUserId", { userId: userId });
};
export const resetPasswordApi = (params: resetUserPassword) => {
  return ApiService.put("/api/user", params);
};
