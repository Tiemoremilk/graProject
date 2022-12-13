export type AddRoleModel = {
  type: string;
  roleId: string;
  roleName: string;
  remark: string;
};
//查询参数类型
export type ListParm = {
  currentPage: number;
  pageSize: number;
  roleName: string;
  total: number;
};
