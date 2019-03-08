<template>
  <div>{{$route.name}}</div>
</template>
<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form
      ref="formData"
      :model="formData"
      label-width="100px"
    >
      <div class="first">
        <el-form-item label="广告展示形式">
          <el-radio
            v-model="formData.advertisement_style"
            :label="0"
          >图文</el-radio>
          <el-radio
            v-model="formData.advertisement_style"
            :label="1"
          >浮窗</el-radio>
          <el-radio
            v-model="formData.advertisement_style"
            :label="2"
          >单图</el-radio>
        </el-form-item>
        <el-form-item label="配置类型">
          <el-radio
            v-model="formData.conf_type"
            :label="0"
          >循环时长</el-radio>
          <el-radio
            v-model="formData.conf_type"
            :label="1"
          >出现频率</el-radio>
          <el-radio
            v-if="formData.advertisement_style==1"
            v-model="formData.conf_type"
            :label="2"
          >显示时长</el-radio>
        </el-form-item>
        <el-form-item label="配置值">
          <el-input v-model="formData.conf_value"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('formData')"
          v-if="$route.name=='添加广告配置'"
        >添加</el-button>
        <el-button
          type="primary"
          @click="editForm('formData')"
          v-if="$route.name=='编辑广告配置'"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    //添加
    submitForm(formName) {
      this.$axios.post("addDeploy", this.formData).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "广告配置添加成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/news/config" });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
          console.log("error submit!!");
          return false;
        }
      });
    },
    //保存
    editForm(formName) {
      let data = {
        ...this.formData
      };
      this.$axios.post("updateDeploy", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "广告配置编辑成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/news/config" });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
          console.log("error edit!!");
          return false;
        }
      });
    },
    //获取数据回填
    getData() {
      this.$axios
        .get("infoDeploy", { ad_conf_id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.ad_conf;
          }
        });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getData();
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px !important;
  text-align: center;
}

.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
</style>

 <style scoped>
.container {
  padding: 30px 80px 0 90px;
}
.top {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-bottom: 41px;
}
.first,
.second {
  padding: 27px 54px 26px 56px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
</style>

