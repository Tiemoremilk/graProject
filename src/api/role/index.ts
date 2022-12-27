import ApiService from "@/utils/request";
import type { AddRoleModel, ListParm } from "../../type/roleModel";

export const addApi = (data: AddRoleModel) => {
  return ApiService.post("/api/role", data);
};
export const getListApi = (params: ListParm) => {
  return ApiService.get("/api/role/list", params);
};
export const editApi = (data: AddRoleModel) => {
  return ApiService.put("/api/role", data);
};
export const deleteApi = (roleId: string) => {
  return ApiService.delete(`/api/role/${roleId}`);
};
