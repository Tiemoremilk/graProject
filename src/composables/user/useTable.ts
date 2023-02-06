import type { ListParam } from "@/type/userModel";
import { getListApi } from "@/api/user/";
import { computed, nextTick, onMounted, reactive } from "vue";
import userSelectRole from "./userSelectRole";
const { getRoleByUserId, roleId, roleData, listRole } = userSelectRole();
export default function useTable() {
  const listParam = reactive<ListParam>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    nickName: "",
    phone: "",
  });
  //列表数据
  const tableList = reactive({
    dataList: [],
  });
  //列表
  const getList = async () => {
    const res: any = await getListApi(listParam);
    if (res && res.code == 200) {
      tableList.dataList = res.data.records;
      await listRole();
      // console.log(roleData.list);
      nextTick(() => {
        tableList.dataList.forEach(async (item: any) => {
          // console.log(item.userId);
          await getRoleByUserId(item.userId);
          item.roleId = roleId.value;
          roleData.list.filter((index) => {
            if (index.value == item.roleId) {
              item.roleName = index.label;
            }
          });
        });
      });
      // console.log(tableList.dataList);
      listParam.total = res.data.total;
    }
  };
  //搜索
  const searchBtn = () => {
    getList();
  };
  //重置
  const resetBtn = () => {
    getList();
  };
  //页容量改变
  const sizeChange = (val: number) => {
    listParam.pageSize = val;
    getList();
  };
  //页数改变
  const currentChange = (val: number) => {
    listParam.currentPage = val;
    getList();
  };
  onMounted(() => {
    getList();
  });

  const tableHeight = computed(() => {
    return window.innerHeight - 230;
  });
  const refresh = () => {
    getList();
  };
  return {
    listParam,
    getList,
    searchBtn,
    resetBtn,
    tableList,
    sizeChange,
    currentChange,
    tableHeight,
    refresh,
  };
}
