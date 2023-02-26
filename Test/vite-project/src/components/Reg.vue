<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { userReg } from "../api/user.js";
import { useVisible } from "../store/login";
const router = useRouter();
const visible = useVisible();
const formState = reactive({
  usrname: "",
  password: "",
  retype: "",
});
//点击事件调用注册Api
const handleReg = (formState) => {
  userReg(formState).then((res) => {
    if (res.data.state) {
      localStorage.setItem("userInfo", JSON.stringify(formState));
      visible.visible = true;
      router.push("/Welcome");
    }
  });
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

    <a-form-item
      label="重复密码"
      name="retype"
      :rules="[{ required: true, message: '请重复你的密码!' }]"
      labelAlign="left"
    >
      <a-input-password v-model:value="formState.retype" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button
        type="primary"
        html-type="submit"
        @click="() => handleReg(formState)"
        >注册</a-button
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
