import type { ListParm } from "@/type/roleModel";
import { reactive } from "vue";
import { getListApi } from "@/api/role";
import { onMounted, ref, nextTick, watchEffect, computed } from "vue";
export default function useTable() {
  //列表高度
  // const tableHeight = ref(0);
  //列表参数
  const listParm = reactive<ListParm>({
    currentPage: 1,
    pageSize: 10,
    roleName: "",
    total: 0,
  });
  //列表数据
  const tableList = reactive({
    dataList: [],
  });
  //列表
  const getList = async () => {
    const res: any = await getListApi(listParm);
    if (res && res.code == 200) {
      tableList.dataList = res.data.records;
      listParm.total = res.data.total;
    }
  };
  //搜索
  const searchBtn = () => {
    getList();
  };
  //重置
  const resetBtn = () => {
    // listParm.roleName = "";
    getList();
  };
  //页容量改变
  const sizeChange = (val: number) => {
    listParm.pageSize = val;
    getList();
  };
  //页数改变
  const currentChange = (val: number) => {
    listParm.currentPage = val;
    getList();
  };
  onMounted(() => {
    getList();
  });
  // watchEffect(() => {
  //   nextTick(() => {
  //     tableHeight.value = window.innerHeight - 230;
  //   });
  // });
  const tableHeight = computed(() => {
    return window.innerHeight - 230;
  });
  const refresh = () => {
    getList();
  };

  return {
    listParm,
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
