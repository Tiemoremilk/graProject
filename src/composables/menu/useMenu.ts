import { EditType } from "@/type/enumType";
import { ref } from "vue";
export default function useMenu() {
  /**addDailg的ref属性 */
  const addRef = ref<{ show: (type: string) => void }>();
  /**新增 */
  const addBtn = () => {
    addRef.value?.show(EditType.ADD);
  };
  /**编辑 */
  const editBtn = () => {};
  /**删除 */
  const deleteBtn = () => {};
  return { addBtn, editBtn, deleteBtn, addRef };
}
