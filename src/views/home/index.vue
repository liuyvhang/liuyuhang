<template>
    <div class="container">
        <div class="lineChart">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="活跃度趋势" name="vitality"></el-tab-pane>
                <el-tab-pane label="激活量趋势" name="activate"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import eChart from "../../components/eChart";
export default {
  data() {
    return {
      activeName: "vitality "
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.lineChart .el-tabs__item {
  font-size: 10px !important;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
}
.lineChart .el-tabs__active-bar {
  background-color: #009688;
}
.lineChart .el-tabs__nav {
  padding-left: 10px;
}
.lineChart .el-tabs__nav-wrap::after {
  background-color: #bbbbbb;
}
.lineChart .el-tabs__item.is-active {
  color: #303133;
}
.lineChart .el-tabs__item:hover {
  color: #303133;
}
</style>

<style scoped>
.lineChart {
  width: 580px;
  height: 240px;
  border: 1px solid #eee;
  background-color: #bbbbbb;
}
</style>
