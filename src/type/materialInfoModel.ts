//定义列表参数类型
export type ListParam = {
  currentPage: number;
  pageSize: number;
  infoName: string;
  total: number;
};
//定义物资信息数据类型
export type MaterialInfoType = {
  infoId: string;
  categoryId: string;
  infoName: string;
  image: string;
  specs: string;
  unit: string;
  infoDesc: string;
  type: string;
  num?: number
  store?: number
};
//物资分类下拉的选择数据类型
export type SelectType = {
  value: string;
  label: string;
};

//下拉数据类表类型
export type SelectTypeList = {
  list: SelectType[];
};
