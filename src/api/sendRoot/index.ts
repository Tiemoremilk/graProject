import ApiService from "@/utils/request";
import type { MaterialSendParam } from "@/type/sendRootModel";
import type { Apply } from "@/type/intoRootModel";

export const sendApi = (param: any) => {
  return ApiService.post("/api/materialSend/sendSave", param);
};
//物资记录列表
export const getSendListApi = (param: MaterialSendParam) => {
  return ApiService.get("/api/materialSend/getSendList", param);
};
export const sendApply = (param: Apply) => {
  return ApiService.post("/api/materialSend/apply", param);
};