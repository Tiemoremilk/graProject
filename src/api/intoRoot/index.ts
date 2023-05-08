import type { Apply, MaterialIntoParam, SelectMaterial } from "@/type/intoRootModel";
import ApiService from "@/utils/request";
//选择物资
export const getMaterialInfoSelectList = (param: SelectMaterial) => {
  return ApiService.get("/api/materialInfo/materialInfoSelectList", param);
};
//物资入库
export const intoSaveApi = (param: any) => {
  return ApiService.post("/api/materialInto/intoSave", param);
};
//查询入库记录
export const getIntoListApi = (param: MaterialIntoParam) => {
  return ApiService.get("/api/materialInto/getIntoList", param);
};
export const applyApi = (param: Apply) => {
  return ApiService.post("/api/materialInto/apply", param);
};