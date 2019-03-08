<template>
    <div class="sidebar">
        <div class="title">
            <i class="fontFamily hhtx-biaoqian">
                <span slot="title" class="content">{{$t('sideBar.tags')}}</span>
            </i>
        </div>
        <el-menu background-color="#20958A" text-color="#fff" active-text-color="#fff" :router="true" :unique-opened="true" :default-active="'/'+$route.path.split('/')[1]+'/'+$route.path.split('/')[2]">
            <el-menu-item index="/tags/all" class="block">
                <template slot="title">{{$t('tags.all')}}</template>
            </el-menu-item>
            <el-menu-item index="/tags/channel" class="block">
                <template slot="title">{{$t('tags.channel')}}</template>
            </el-menu-item>
            <el-menu-item index="/tags/project" class="block">
                <template slot="title">{{$t('tags.project')}}</template>
            </el-menu-item>
            <el-menu-item index="/tags/hot" class="block">
                <template slot="title">{{$t('tags.hot')}}</template>
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
.hhtx-biaoqian {
  font-size: 40px;
  color: #20958a;
}
</style>
