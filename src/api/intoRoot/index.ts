import type { SelectMaterial } from "@/type/intoRoot";
import ApiService from "@/utils/request";
//选择物资
export const getMaterialInfoSelectList = (parm: SelectMaterial) => {
  return ApiService.get("/api/materialInfo/materialInfoSelectList", parm);
};