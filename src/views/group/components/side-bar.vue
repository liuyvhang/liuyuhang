<template>
    <div class="sidebar">
        <div class="title">
            <i class="fontFamily hhtx-qunzu1">
                <span slot="title" class="content">{{$t('sideBar.group')}}</span>
            </i>
        </div>
        <el-menu background-color="#20958A" text-color="#fff" active-text-color="#fff" :router="true" :unique-opened="true" :default-active="'/'+$route.path.split('/')[1]+'/'+$route.path.split('/')[2]">
            <el-menu-item index="/group/group" class="block">
                <template slot="title">{{$t('group.group')}}</template>
            </el-menu-item>
            <el-menu-item index="/group/classify" class="block">
                <template slot="title">{{$t('group.classify')}}</template>
            </el-menu-item>
            <el-menu-item index="/group/label" class="block">
                <template slot="title">{{$t('group.label')}}</template>
            </el-menu-item>
            <el-menu-item index="/group/invitation" class="block">
                <template slot="title">{{$t('group.invitation')}}</template>
            </el-menu-item>
            <el-menu-item index="/group/question" class="block">
                <template slot="title">{{$t('group.question')}}</template>
            </el-menu-item>
            <el-menu-item index="/group/guess" class="block">
                <template slot="title">{{$t('group.guess')}}</template>
            </el-menu-item>
            <el-menu-item index="/group/product" class="block">
                <template slot="title">{{$t('group.product')}}</template>
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
.hhtx-qunzu1 {
  font-size: 40px;
  color: #20958a;
}
</style>
