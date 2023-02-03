import type { ListParam } from "@/type/userModel";
import { computed, onMounted, reactive } from "vue";

export default function useTable() {
  const listParam = reactive<ListParam>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    nickName: "",
    phone: "",
  });
  //列表
  const getList = async () => {};
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
  return { listParam, searchBtn, resetBtn };
}
