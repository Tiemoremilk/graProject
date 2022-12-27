import { ElMessageBox } from "element-plus";
export default async function messageBox(content: string, title: string ) {
  try {
    return await new Promise((resolve, reject) => {
      ElMessageBox.confirm(content, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  } catch {
    return false;
  }
}
