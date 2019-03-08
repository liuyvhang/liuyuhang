<template>
  <div class="sidebar">
    <div class="title">
      <i class="fontFamily hhtx-youxi">
        <span
          slot="title"
          class="content"
        >{{$t('sideBar.game')}}</span>
      </i>
    </div>
    <el-menu
      background-color="#20958A"
      text-color="#fff"
      active-text-color="#fff"
      :router="true"
      :unique-opened="true"
      :default-active="'/'+$route.path.split('/')[1]+'/'+$route.path.split('/')[2]"
    >
      <el-submenu index="1">
        <template slot="title">
          {{$t('game.title')}}
        </template>
        <el-menu-item-group>
          <el-menu-item index="/game/game">{{$t('game.game')}}</el-menu-item>
          <el-menu-item index="/game/config">{{$t('game.config')}}</el-menu-item>
          <el-menu-item index="/game/strategy">{{$t('game.strategy')}}</el-menu-item>
          <el-menu-item index="/game/bank">{{$t('game.bank')}}</el-menu-item>
          <el-menu-item index="/game/topic">{{$t('game.topic')}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        index="/game/match"
        class="block"
      >
        <template slot="title">{{$t('game.match')}}</template>
      </el-menu-item>
      <el-menu-item
        index="/game/award"
        class="block"
      >
        <template slot="title">{{$t('game.award')}}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style>
.sidebar .el-menu {
  border-right: none;
}
.sidebar .el-menu-item.is-active {
  background-color: #e69620 !important;
}
.sidebar .el-menu-item-group__title {
  padding: 0 !important;
}
.sidebar .el-submenu .el-menu-item {
  min-width: 126px;
  padding: 0 !important;
}
</style>

<style lang="css" scoped>
.sidebar {
  width: 126px;
  position: absolute;
  top: 60px;
  left: 84px;
  bottom: 0;
  background-color: #939393;
  text-align: center;
}
.title {
  margin-top: 20px;
  height: 93px;
}
.content {
  display: block;
  font-size: 16px;
  color: #fff;
}
.hhtx-youxi {
  font-size: 40px;
  color: #20958a;
}
</style>
