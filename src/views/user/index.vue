<template>
    <div class="user">
        <side-bar class="sidebar"></side-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import sideBar from "./components/side-bar";
export default {
  name: "index",
  components: {
    sideBar
  }
};
</script>

<style>
</style>
<style scoped>
.user {
  padding-left: 126px;
}

</style>




