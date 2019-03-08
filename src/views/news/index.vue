<template>
  <div class="news">
    <side-bar></side-bar>
      <router-view></router-view>
    </div>
</template>

<script>
import sideBar from "./components/side-bar";
export default {
  name: "index",
  components: {
    sideBar,
  }
};
</script>

<style>
</style>
<style scoped>
.news{
  padding-left:126px;
}
</style>




