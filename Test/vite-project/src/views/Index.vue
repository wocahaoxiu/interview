<script setup>
import { ref, onMounted } from "vue";
import Charts from "../components/Charts.vue";
import { userSignOut, useservice } from "../api/user";
import { useRouter } from "vue-router";
const router = useRouter();
const sdetails = ref([]);
const mdetails = ref([]);
const scolumns = ref([]);
const mcolumns = ref([]);
const user = ref([]);
onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("userInfo"));
  useservice({}).then((res) => {
    //连接websocket
    let ws = new WebSocket(`wss://192.168.2.21:9888${res.data.data.url}`);
    ws.onmessage = function (msg) {
      var obj = JSON.parse(msg.data);
      //处理websocket推送的消息
      if (obj.endpt[0] == "m") {
        mcolumns.value = [];
        mdetails.value = [];
        for (let item in obj) {
          if (item == "params") {
            mcolumns.value.push(obj[item]);
          } else {
            if (item == "reporttm") {
              mdetails.value.push(timestampToTime(obj[item]));
              return;
            }
            mdetails.value.push(obj[item]);
          }
        }
      } else {
        console.log(obj);
        scolumns.value = [];
        sdetails.value = [];
        for (let item in obj) {
          if (item == "params") {
            scolumns.value.push(obj[item]);
          } else {
            if (item == "reporttm") {
              sdetails.value.push(timestampToTime(obj[item]));
              return;
            }
            sdetails.value.push(obj[item]);
          }
        }
      }
    };
  });
});
const handleLogOut = () => {
  userSignOut().then((res) => {
    localStorage.removeItem("userInfo");
    router.push("/Welcome");
  });
};
function timestampToTime(timestamp) {
  //时间戳转日期
  var date = new Date(timestamp * 1000);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
</script>
<template>
  <h1>首页</h1>
  <h2>
    欢迎你，尊敬的
    <span>{{ user.usrname }}</span>
  </h2>
  <a-button type="primary" @click="() => handleLogOut()">注销</a-button>
  <p>服务器状态汇报</p>
  <table :data="mdetails">
    <tr>
      <th>服务器别名</th>
      <th>服务器唯一标识</th>
      <th>服务器所在地址</th>
      <th>时间</th>
      <th>服务器详情</th>
    </tr>
    <tr>
      <td v-for="item in mdetails">{{ item }}</td>
    </tr>
  </table>
  <p>服务状态汇报</p>
  <table :data="sdetails">
    <tr>
      <th>服务器别名</th>
      <th>服务器唯一标识</th>
      <th>服务器所在地址</th>
      <th>时间</th>
      <th>服务器详情</th>
    </tr>
    <tr>
      <td v-for="item in sdetails">{{ item }}</td>
    </tr>
  </table>
  <!-- <a-table
    class="ant-table-striped"
    size="middle"
    :columns="mcolumns"
    :data-source="sdetails"
    :rowClassName="123"
  />
  
  <a-table
    class="ant-table-striped"
    size="middle"
    :columns="columns"
    :data-source="mdetails"
    :rowClassName="123"
  /> -->
</template>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
table {
  width: 1200px;
  border: 1px solid #000;
  margin: 10px;
  table-layout: fixed;
  font-size: 24px;
}
td,
th {
  border: 1px solid #000;
}
p {
  font-size: 36px;
}
</style>
