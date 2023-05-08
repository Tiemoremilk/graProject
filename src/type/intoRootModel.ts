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
//入库记录列表参数类型
export type MaterialIntoParam = {
  currentPage: number,
  pageSize: number,
  province: string,
  name: string,
  total: number,
  status: string,
  type: string
}
export type Apply = {
  intoId: string
  status: string,
}