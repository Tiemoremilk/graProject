import ApiService from "@/utils/request";
import type { NoticeParam, NoticeType } from "@/type/noticeModel";

export const addNotice = (param: NoticeType) => {
  return ApiService.post("/api/notice", param);
};
export const getNoticeList = (param: NoticeParam) => {
  return ApiService.get("/api/notice/list", param);
};
export const editNotice = (param: NoticeType) => {
  return ApiService.put("/api/notice", param);
};
export const deleteNotice = (noticeId: string) => {
  return ApiService.delete(`/api/notice/${noticeId}`);
};