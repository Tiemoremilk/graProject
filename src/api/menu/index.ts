import type { MenuType } from "./../../type/menuModel";
import ApiService from "@/utils/request";

/**查询上级菜单 */
export const getParentApi = () => {
  return ApiService.get("/api/menu/menuParent");
};
/**新增 */
export const addApi = (data: MenuType) => {
  return ApiService.post("/api/menu", data);
};
/**列表 */
export const getListApi = () => {
  return ApiService.get("/api/menu/menuList");
};
/**编辑 */
export const editApi = (data: MenuType) => {
  return ApiService.put("/api/menu", data);
};
/**删除 */
export const deleteApi = (roleId: string) => {
  return ApiService.delete(`/api/menu/${roleId}`);
};
