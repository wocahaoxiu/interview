<script setup>
import { reactive } from "vue";
import { userLogin } from "../api/user.js";
import { useStore } from "../store";
const formState = reactive({
  usrname: "",
  password: "",
});
const user = useStore();
//点击事件调用pinia中的登录action
const handleLogin = (formState) => {
  user.userLoginAction(formState);
};
</script>

<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    class="loginForm"
  >
    <a-form-item
      label="账号"
      name="usrname"
      :rules="[{ required: true, message: '请输入你的账号!' }]"
      labelAlign="left"
    >
      <a-input v-model:value="formState.usrname" />
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '请输入你的密码!' }]"
      labelAlign="left"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button
        type="primary"
        html-type="submit"
        @click="() => handleLogin(formState)"
        >登录</a-button
      >
    </a-form-item>
  </a-form>
</template>

<style scoped>
.loginForm {
  background: skyblue;
  padding: 40px;
  border-radius: 10px;
}
</style>
