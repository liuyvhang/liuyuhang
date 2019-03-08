<template>
  <div class="layout">
    <top-header></top-header>
    <side-bar></side-bar>
    <div class="loading">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sideBar from "./components/side-bar";
import topHeader from "./components/top-header";
export default {
  name: "index",
  components: {
    sideBar,
    topHeader
  }
};
</script>

<style>
html,
body {
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
</style>
<style scoped>
.layout {
  padding-top: 60px;
}
.layout {
  padding-left: 84px;
}
</style>




