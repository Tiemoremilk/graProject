import { ref } from "vue";

export default function useRole() {
  const addRef = ref<{ onShow: () => void }>();
  //新增
  const addBtn = () => {
    addRef.value?.onShow();
  };
  //编辑
  const editBtn = () => {};
  //删除
  const deleteBtn = () => {};
  return {
    addBtn,
    editBtn,
    deleteBtn,
    addRef,
  };
}
