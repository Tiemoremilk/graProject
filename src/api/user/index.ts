import type { AddUserModel } from "./../../type/userModel";
import ApiService from "@/utils/request";

export const getSelectApi = () => {
  return ApiService.get("api/role/getListSelect");
};
export const addApi = (param: AddUserModel) => {
  return ApiService.post("api/role", param);
};
