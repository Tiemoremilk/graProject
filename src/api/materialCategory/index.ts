import type { ListParam, MaterialCategoryType } from "@/type/materialCategoryModel";
import ApiService from "@/utils/request";

/**
 * 列表查询
 * @param params
 * @returns
 */
export const getListApi = (params: ListParam) => {
  return ApiService.get("api/materialCategory/materialCategoryList", params);
};
/**
 * 新增
 * @param data
 * @returns
 */
export const addApi = (data: MaterialCategoryType) => {
  return ApiService.post("/api/materialCategory", data);
};
/**
 * 编辑
 * @param data
 * @returns
 */
export const editApi = (data: MaterialCategoryType) => {
  return ApiService.put("/api/materialCategory", data);
};
/**
 *删除
 * @param categoryId
 * @returns
 */
export const deleteApi = (categoryId: string) => {
  return ApiService.delete(`/api/materialCategory/${categoryId}`);
};
