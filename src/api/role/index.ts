import ApiService from "@/utils/request";
import type { AddRoleModel } from "./roleModel";

export const addApi = (params: AddRoleModel) => {
  return ApiService.post("/api/role", params);
};
