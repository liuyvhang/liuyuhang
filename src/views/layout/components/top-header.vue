<template>
  <div class="top-header">
    <div class="left">
      <span class="title">{{$t('layout.backstage')}}</span>
    </div>
    <div class="right">
      <div class="search">
        <el-input v-model="input" :placeholder="search" size="mini" style="width:200px;" @keyup.enter.native="goSearch">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="goSearch"></i>
        </el-input>
      </div>
      <el-dropdown @command="handleCommand">
        <div class="userInfo">
          <div class="avatar">
            <img :src="userInfo.avatar">
          </div>
          <span class="username">{{userInfo.username}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="getUserInfo">{{$t('layout.userInfo')}}</el-dropdown-item>
          <el-dropdown-item command="logout">{{$t('layout.logout')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="fontFamily hhtx-quanping" @click="buttoncli"></span>
      <span class="fontFamily hhtx-fanyi-full" @click="changeLangEvent"></span>
    </div>
  </div>
</template>
<script>
import screenfull from "screenfull";
import { lang } from "@/utils";
export default {
  name: "top-header",
  data() {
    return {
      userInfo: {
        username: "小明",
        avatar:
          "https://user-gold-cdn.xitu.io/2017/8/1/130093c4454da98ce9f386fa94379562?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
      },
      search: this.$t("layout.search"),
      input: ""
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "getUserInfo") {
        console.log(11);
      }
      if (command == "logout") {
        // this.$store.dispatch("LogOut").then(() => {
        //   location.reload(); // 为了重新实例化vue-router对象 避免bug
        // });
      }
    },
    buttoncli() {
      screenfull.toggle();
    },
    changeLangEvent() {
      if (this.$store.state.lang === "zh-CN") {
        var lang = "en-US";
        this.$store.commit("SET_LANG", lang);
        this.$i18n.locale = "en-US";
        this.search = this.$t("layout.search");
      } else {
        var lang = "zh-CN";
        this.$store.commit("SET_LANG", lang);
        this.$i18n.locale = "zh-CN";
        this.search = this.$t("layout.search");
      }
    },
    goSearch() {
      console.log("你搜啥");
    }
  },
  beforeCreate() {
    // console.log(lang.get().lang);
  }
};
</script>


<style lang="css" scoped>
.top-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(16, 16, 16, 0.61);
  z-index: 99;
  line-height: 1;
  font-size: 26px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.52);
  display: flex;

  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.userInfo {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 30px;
}
img {
  width: 100%;
  height: 100%；;
}
.username {
  margin-left: 6px;
  margin-right: 10px;
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.75);
}
.right {
  display: flex;
  align-items: center;
  align-content: center;
}
.fontFamily {
  font-size: 24px;
  font-weight: 400;
}
.hhtx-fanyi-full {
  margin-left: 10px;
}
</style>
