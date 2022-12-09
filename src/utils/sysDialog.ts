import { reactive } from "vue";
import type { DialogModel } from "./dialogType";
export default function sysDialog() {
  //弹窗
  const dialog = reactive<DialogModel>({
    visible: false,
    height: 150,
    title: "标题",
    width: 630,
  });
  const onConfirm = () => {
    dialog.visible = false;
  };
  const onClose = () => {
    dialog.visible = false;
  };
  const onShow = () => {
    dialog.visible = true;
  };
  return {
    dialog,
    onConfirm,
    onClose,
    onShow,
  };
}
