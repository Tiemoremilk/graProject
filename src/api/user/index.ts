import ApiService from "@/utils/request";

export const getSelectApi = () => {
  return ApiService.get("api/role/getListSelect");
};
