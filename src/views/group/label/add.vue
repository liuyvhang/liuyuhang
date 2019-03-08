<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="标签名称">
        <el-input v-model="formData.community_label_name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="标签图片">
        <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="formData.community_label_pic" :src="formData.community_label_pic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标签描述" prop="community_label_desc">
        <el-input v-model="formData.community_label_desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加社群标签'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑社群标签'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {},
      classifyOptions: []
    };
  },
  methods: {
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    handleAvatarSuccess(res, file) {
      this.formData.community_label_pic = res.data.upload.url;
    },
    //添加
    submitForm(formName) {
      console.log(this.$refs.formData);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            ...this.formData,
            id: this.$route.query.id
          };
          this.$axios.get("addLabelList", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "标签添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/group/label" });
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
              console.log("error submit!!");
              return false;
            }
          });
        }
      });
    },
    //保存
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            ...this.formData,
            id: this.$route.query.id
          };
          console.log(data);
          this.$axios.get("updateLabelList", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "标签编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/group/label" });
            }
          });
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
        .get("infoLabelList", { id: this.$route.query.id })
        .then(res => {
          this.formData = res.data.classifyLabelDetail;
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
</style>

