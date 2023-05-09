import { ref } from "vue";
import type { FuncList } from "@/type/baseType";
import useInstance from "@/hooks/useInstance";
import type { NoticeType } from "@/type/noticeModel";
import { EditType } from "@/type/enumType";
import { deleteNotice } from "@/api/noticeRoot";
import { ElMessage } from "element-plus";

export default function useNotice(getList: FuncList) {
  const { global } = useInstance();
  //弹框组件属性
  const addRef = ref<{ show: (type: string, row?: NoticeType) => void }>();
  //新增
  const addBtn = () => {
    addRef.value?.show(EditType.ADD);

  };
  //编辑
  const editBtn = (row: NoticeType) => {
    addRef.value?.show(EditType.EDIT, row);
  };
  //删除
  const deleteBtn = async (row: NoticeType) => {
    const confirm = await global.$messageBox("确定删除该数据吗", "提示");
    if (confirm) {
      const res: any = await deleteNotice(row.noticeId);
      if (res && res.code == 200) {
        ElMessage.success(res.msg);
        getList();
      }
    }
  };
  return {
    addBtn,
    deleteBtn,
    editBtn,
    addRef
  };
}