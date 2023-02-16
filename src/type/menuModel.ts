//菜单数据类型
export type MenuType = {
  open?: boolean;
  editType: string; //新增、编辑
  menuId: string;
  parentId: string;
  title: string;
  code: string;
  name: string;
  path: string;
  url: string;
  type: string;
  icon: string;
  parentName: string;
  orderNum: string;
};
//选中上级菜单数据类型
export type SelectNode = {
  parentId: string;
  parentName: string;
};
