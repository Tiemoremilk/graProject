export type AddRoleModel = {
  type: string;
  roleId: string;
  roleName: string;
  remark: string;
};
//查询参数类型
export type ListParm = {
[x: string]: any;
  currentPage: number;
  pageSize: number;
  roleName: string;
  total: number;
};
