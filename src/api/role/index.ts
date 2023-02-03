import ApiService from "@/utils/request";
import type { AddRoleModel, ListParam } from "../../type/roleModel";

export const addApi = (data: AddRoleModel) => {
  return ApiService.post("/api/role", data);
};
export const getListApi = (params: ListParam) => {
  return ApiService.get("/api/role/roleList", params);
};
export const editApi = (data: AddRoleModel) => {
  return ApiService.put("/api/role", data);
};
export const deleteApi = (roleId: string) => {
  return ApiService.delete(`/api/role/${roleId}`);
};
