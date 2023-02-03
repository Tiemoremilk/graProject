import type { AddUserModel, ListParam } from "./../../type/userModel";
import ApiService from "@/utils/request";

export const getSelectApi = () => {
  return ApiService.get("api/role/getListSelect");
};
export const addApi = (param: AddUserModel) => {
  return ApiService.post("api/user", param);
};
export const getListApi = (params: ListParam) => {
  return ApiService.get("api/user/userList",params);
}
