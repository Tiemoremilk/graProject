import type { AddInfoType, SelectMaterial } from "@/type/intoRootModel";
import type { Ref } from "vue";
import { nextTick, onMounted, reactive, ref } from "vue";
import { getMaterialInfoSelectList } from "@/api/intoRoot/index";
import { ElMessage } from "element-plus";
import type { MaterialInfoType } from "@/type/materialInfoModel";

export default function useSelectInfo() {
  const selectTableHeight: Ref<number> = ref(0);
  //表格数据
  const selectTable = reactive({
    list: []
  });
  //表格查询参数
  const selectParam = reactive<SelectMaterial>({
    categoryId: "",
    currentPage: 1,
    pageSize: 10,
    infoName: "",
    total: 0
  });
  //查询表格数据
  const getSelectList = async () => {
    const res: any = await getMaterialInfoSelectList(selectParam);
    if (res && res.code == 200) {
      selectTable.list = res.data.records;
      selectParam.total = res.data.total;
    }
  };
  const addBtn = (row: MaterialInfoType) => {
    const flag = addTableData.list.some(item => item.infoId === row.infoId);
    if (flag) {
      ElMessage.warning("该物资已经选择！");
      return;
    }
    //数量默认是1
    row.num = 1;
    addTableData.list.push(row);
    ElMessage.success("加入成功!");
  };
  const addTableData = reactive<AddInfoType>({
    list: []
  });

  //物资查询
  const searchSelect = () => {
    getSelectList();
  };
  //重置
  const resetSelect = () => {
    selectParam.categoryId = "";
    selectParam.infoName = "";
    getSelectList();
  };
  //页容量改变时触发
  const sizeChange = (size: number) => {
    selectParam.pageSize = size;
    getSelectList();
  };
  //页数改变触发
  const currentChange = (page: number) => {
    selectParam.currentPage = page;
    getSelectList();
  };
  const deleteAddBtn = (row: MaterialInfoType) => {
    addTableData.list = addTableData.list.filter(item => item.infoId != row.infoId);
  };
  onMounted(() => {
    nextTick(() => {
      selectTableHeight.value = window.innerHeight - 150;
    });
  });
  return {
    selectTable,
    selectParam,
    getSelectList,
    searchSelect,
    resetSelect,
    sizeChange,
    currentChange,
    selectTableHeight,
    addBtn,
    addTableData,
    deleteAddBtn
  };
}