import type { ListParam, MaterialInfoType } from "@/type/materialInfoModel";
import ApiService from "@/utils/request";

/**
 * 列表查询
 * @param params
 * @returns
 */
export const getListApi = (params: ListParam) => {
  return ApiService.get("/api/materialInfo/materialInfoList", params);
};
/**
 * 新增
 * @param data
 * @returns
 */
export const addApi = (data: MaterialInfoType) => {
  return ApiService.post("/api/materialInfo", data);
};
/**
 * 编辑
 * @param data
 * @returns
 */
export const editApi = (data: MaterialInfoType) => {
  return ApiService.put("/api/materialInfo", data);
};
/**
 *删除
 * @param categoryId
 * @returns
 */
export const deleteApi = (infoId: string) => {
  return ApiService.delete(`/api/materialInfo/${infoId}`);
};
/**
 *
 * @returns
 */
export const getSelectApi = () => {
  return ApiService.get("api/materialInfo/getListSelect");
};
/**
 * 图片上传
 * @param parm
 * @returns
 */
export const uploadImageApi = (param: object) => {
  return ApiService.upload("/api/upload/uploadImage", param);
};
/**
 * 图片删除
 */
export const deleteImageApi = (param: object) => {
  return ApiService.deleteImage("/api/upload/deleteImage", param);
};
