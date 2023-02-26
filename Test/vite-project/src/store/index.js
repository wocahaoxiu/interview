import { defineStore } from "pinia";
import { userLogin } from "../api/user";
import router from "../router/index";

export const useStore = defineStore("store", {
  state: () => ({
    userInfo: null,
  }),
  actions: {
    //登录action调用登录Api
    async userLoginAction(user) {
      let res = await userLogin(user);
      console.log(res.data.state);
      console.log(res);
      if (res.data.state) {
        this.userInfo = res.config.data;
        // console.log(res.config.data);
        localStorage.setItem("userInfo", res.config.data);
        router.push("/");
      }
    },
  },
});
