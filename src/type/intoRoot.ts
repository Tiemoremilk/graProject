import type { MaterialInfoType } from "@/type/materialInfoModel";

export type IntoType = {}
//定义选择物资参数类型
export type SelectMaterial = {
  categoryId: string,
  currentPage: number,
  pageSize: number,
  infoName: string,
  total: number
}
export type AddInfoType = {
  list: MaterialInfoType[]
}