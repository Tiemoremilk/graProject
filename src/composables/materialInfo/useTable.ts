import { getListApi } from "@/api/materialInfo";
import type { ListParam } from "@/type/materialInfoModel";
import { computed, onMounted, reactive } from "vue";

export default function useTable() {
  //列表参数
  const listParam = reactive<ListParam>({
    currentPage: 1,
    pageSize: 10,
    infoName: "",
    total: 0,
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
      listParam.total = res.data.total;
    }
  };
  //搜索
  const searchBtn = () => {
    getList();
  };
  //重置
  const resetBtn = () => {
    // listParam.roleName = "";
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
