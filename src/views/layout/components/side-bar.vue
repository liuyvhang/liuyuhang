<template>
  <div class="side-bar">
    <el-scrollbar wrap-class="list" view-class="view-box" :native="false">
      <el-menu background-color="#EFF1F7" text-color="#000" active-text-color="#000" :router="true" :unique-opened="true" :default-active="'/'+$route.path.split('/')[1]">
        <el-menu-item index="/home" class="block">
          <i class="fontFamily hhtx-zhuye">
            <div slot="title" class="content">{{$t('sideBar.home')}}</div>
          </i>
        </el-menu-item>
        <el-menu-item index="/news" class="block">
          <i class="fontFamily hhtx-xinwenzixun">
            <div slot="title" class="content">{{$t('sideBar.news')}}</div>
          </i>

        </el-menu-item>
        <el-menu-item index="/video" class="block">
          <i class="fontFamily hhtx-shipin1">
            <div slot="title" class="content">{{$t('sideBar.video')}}</div>
          </i>

        </el-menu-item>
        <el-menu-item index="/group" class="block">
          <i class="fontFamily hhtx-qunzu1">
            <div slot="title" class="content">{{$t('sideBar.group')}}</div>
          </i>

        </el-menu-item>
        <el-menu-item index="/game" class="block">
          <i class="fontFamily hhtx-youxi">
            <div slot="title" class="content">{{$t('sideBar.game')}}</div>
          </i>

        </el-menu-item>
        <el-menu-item index="/user" class="block">
          <i class="fontFamily hhtx-yonghu">
            <div slot="title" class="content">{{$t('sideBar.user')}}</div>
          </i>
        </el-menu-item>

        <el-menu-item index="/tags" class="block">
          <i class="fontFamily hhtx-biaoqian">
            <div slot="title" class="content">{{$t('sideBar.tags')}}</div>
          </i>
        </el-menu-item>

        <el-menu-item index="/score" class="block">
          <i class="fontFamily hhtx-jifen">
            <div slot="title" class="content">{{$t('sideBar.score')}}</div>
          </i>

        </el-menu-item>
        <el-menu-item index="/message" class="block">
          <i class="fontFamily hhtx-ai-message">
            <div slot="title" class="content">{{$t('sideBar.message')}}</div>
          </i>
        </el-menu-item>

      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: "side-bar",
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style>
.side-bar .el-menu {
  border-right: none;
}
.side-bar .el-menu-item.is-active {
  border-left: seagreen !important;
}
.container {
  height: 683px;
  overflow: auto;
}
.list {
  max-height: 683px;
}
</style>

<style lang="css" scoped>
.side-bar {
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 84px;
  text-align: center;
}
.block {
  height: 100px;
}
.content {
  font-size: 10px;
  margin-top: -25px;
  line-height: 0;
}
.fontFamily {
  font-size: 30px;
  line-height: 100px;
}
.hhtx-qunzu {
  fill: gray;
}
.hhtx-shipin1,
.hhtx-qunzu1,
.hhtx-youxi {
  font-size: 40px;
}
.active {
  border-left: 5px solid green;
}
</style>
