<template>
  <div class="sidebar">
    <div class="title">
      <i class="fontFamily hhtx-xinwenzixun">
        <span
          slot="title"
          class="content"
        >{{$t('sideBar.news')}}</span>
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
      <el-menu-item
        index="/news/news"
        class="block"
      >
        <template slot="title">{{$t('news.news')}}</template>
      </el-menu-item>
      <el-menu-item
        index="/news/flash"
        class="block"
      >
        <template slot="title">{{$t('news.flash')}}</template>
      </el-menu-item>
      <el-menu-item
        index="/news/video"
        class="block"
      >
        <template slot="title">{{$t('news.video')}}</template>
      </el-menu-item>
      <!-- <el-menu-item index="/news/ad" class="block">
                <template slot="title">{{$t('news.ad')}}</template>
            </el-menu-item> -->
      <el-submenu index="1">
        <template slot="title">
          {{$t('news.ad')}}
        </template>
        <el-menu-item-group>
          <el-menu-item index="/news/ad">广告管理</el-menu-item>
          <el-menu-item index="/news/adNews">资讯广告</el-menu-item>
          <el-menu-item index="/news/position">广告位置</el-menu-item>
          <el-menu-item index="/news/config">广告配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        index="/news/activity"
        class="block"
      >
        <template slot="title">{{$t('news.activity')}}</template>
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
.hhtx-xinwenzixun {
  font-size: 40px;
  color: #20958a;
}
</style>
