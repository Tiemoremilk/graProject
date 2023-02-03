//角色下拉的选择数据类型
export type SelectType = {
  value: string;
  label: string;
};

//下拉数据类表类型
export type SelectTypeList = {
  list: SelectType[];
};

//查询列表的数据类型
export type ListParm = {
  currentPage: number;
  pageSize: number;
  nickName: string;
  phone: string;
  total: number;
};

//定义用户的数据类型
export type AddUserModel = {
  type: string;
  userId: string;
  roleId: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  sex: string;
  isEnabled: boolean;
  nickName: string;
  // createTime: Date;
  // updateTime: Date;
};

//
