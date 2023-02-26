<script setup>
import { ref } from "vue";
import Login from "../components/Login.vue";
import { useVisible } from "../store/login";
const visible = useVisible();
// const visible = ref(false);

const showModal = () => {
  visible.visible = true;
};
</script>

<template>
  <h1>欢迎您！</h1>
  <div v-if="1">
    <a-button type="primary" @click="showModal">登录</a-button>
    <a-button type="primary"
      ><RouterLink to="/Register">注册</RouterLink></a-button
    >
    <a-modal v-model:visible="visible.visible">
      <Login></Login>
    </a-modal>
  </div>
</template>

<style scoped></style>
