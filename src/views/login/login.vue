<template>
  <el-container>
    <el-form
      :model="ruleLogin"
      status-icon
      :rules="loginRules"
      ref="ruleLogin"
      class="demo-ruleForm"
    >
      <el-form-item prop="user_phone">
        <el-input
          type="text"
          v-model="ruleLogin.user_phone"
          auto-complete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="user_pwd">
        <el-input
          type="password"
          v-model="ruleLogin.user_pwd"
          auto-complete="off"
          placeholder="请输入密码"
          @keyup.enter.native="submitForm('ruleLogin')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleLogin')"
          :loading="loading"
        >登录</el-button>
        <!-- <el-button @click="register">注册</el-button> -->
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      ruleLogin: {
        user_phone: "admin",
        user_pwd: "123456"
      },
      loginRules: {
        user_phone: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        user_pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {},
    login() {
      this.$axios
        .post("addUser", this.ruleLogin)
        .then(res => {
          this.loading = false;
          console.log(res);
          if (res.code == 200) {
            this.$store.commit("LOGIN_IN", res.userInfo);
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.$router.push({ path: this.redirect || "/" });
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.el-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  background-color: skyblue;
}

.el-form {
  border-radius: 20px;
  background-color: #ffffff;
  padding: 40px 30px;
}
.el-form-item {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: space-between;
}
.el-input {
  flex: 1;
  -webkit-flex: 1;
  width: 260px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
input {
  flex: 1;
  -webkit-flex: 1;
}
</style>