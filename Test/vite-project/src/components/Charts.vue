<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onUpdated } from "vue";
const myCharts = ref(null);
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(myCharts.value);
  // 绘制图表
  myChart.setOption({
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });
});
</script>
<template>
  <div ref="myCharts" class="charts"></div>
  <!-- <a-table
    class="ant-table-striped"
    size="middle"
    :columns="columns"
    :data-source="details"
    :rowClassName="
      (record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
  /> -->
  <!-- <div>{{ details }}</div> -->
</template>
<style scoped>
.charts {
  width: 400px;
  height: 400px;
}
</style>
