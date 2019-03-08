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
      :rules="rules"
      label-width="100px"
    >
      <div class="first">
        <el-form-item label="广告位名称">
          <el-input
            v-model="formData.position_name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告位编码">
          <el-input
            v-model="formData.position_code"
            placeholder="请输入编码"
          ></el-input>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="状态">
          <el-radio
            v-model="formData.state"
            :label="0"
          >有效</el-radio>
          <el-radio
            v-model="formData.state"
            :label="1"
          >无效</el-radio>
        </el-form-item>
        <el-form-item
          label="广告位描述"
          prop="position_desc"
        >
          <el-input
            v-model="formData.position_desc"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('formData')"
          v-if="$route.name=='添加广告位'"
        >添加</el-button>
        <el-button
          type="primary"
          @click="editForm('formData')"
          v-if="$route.name=='编辑广告位'"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {}
    };
  },
  methods: {
    //添加
    submitForm(formName) {
      this.$axios.post("addPosition", this.formData).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "广告位添加成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/news/position" });
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
      this.$axios.post("updatePosition", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "广告位编辑成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/news/position" });
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
        .get("infoPosition", { ad_position_id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.ad_position;
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

