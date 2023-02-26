import { defineStore } from "pinia";
//登录页的弹窗状态
export const useVisible = defineStore("visible", {
  state: () => ({
    visible: false,
  }),
});
