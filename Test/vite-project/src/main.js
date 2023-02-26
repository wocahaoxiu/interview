import { createApp } from "vue";
import "./style.css";
import router from "./router/index";
import App from "./App.vue";
import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import "ant-design-vue/dist/antd.css";
import { useStore } from "./store/index";

let app = createApp(App);
const pinia = createPinia();
app.use(pinia);
const user = useStore();
const userInfo = localStorage.getItem("userInfo");

if (userInfo) {
  user.userInfo = JSON.parse(userInfo);
}
app.use(router);
app.use(Antd);

app.mount("#app");
