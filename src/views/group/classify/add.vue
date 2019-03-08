<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="分类名称">
        <el-input v-model="formData.community_classify_name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="分类图片">
        <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="formData.community_classify_pic" :src="formData.community_classify_pic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="分类标签" class="classify">
        <v-selectpage class="form-control" :data="communityClassifyLabelList" show-field="community_label_name" :multiple="true" v-model="formData.labelIds" @values="multipleValues" @removed="removeValues" placeholder="请选择标签" style="width:350px">
        </v-selectpage>
      </el-form-item>
      <el-form-item label="分类描述" prop="community_classify_desc">
        <el-input v-model="formData.community_classify_desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input v-model="formData.introduction" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加社群分类'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑社群分类'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: { community_classify_pic: "", labelIds: "" },
      communityClassifyLabelList: [],
      rules: {}
    };
  },
  methods: {
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    handleAvatarSuccess(res, file) {
      this.formData.community_classify_pic = res.data.upload.url;
    },
    multipleValues(val) {},
    removeValues(val) {
      console.log(val);
    },
    //添加
    submitForm(formName) {
      console.log(this.$refs.formData);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            ...this.formData
          };
          console.log(data);
          this.$axios.get("addClassify", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "社群分类添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/group/classify" });
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
    addRelative() {
      this.$axios
        .get("addRelative", {
          classifyId: this.$route.query.id,
          labelId: this.formData.labelIds
        })
        .then(res => {
          if (res.code == 200) {
          } else {
            this.$message.warning(res.msg);
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
          this.addRelative();
          this.$axios.get("updateClassify", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "社群分类编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/group/classify" });
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
        .get("infoClassify", { id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.classifyDetail;
          }
        });
    },
    getLabel() {
      this.$axios.get("getLabelList", { page: "" }).then(res => {
        this.communityClassifyLabelList = res.data.communityClassifyLabelList;
      });
    },
    getLabelInfo() {
      this.$axios
        .get("getRelativeLabel", {
          classifyId: this.$route.query.id,
          page: 1
        })
        .then(res => {
          if (res.code == 200) {
            var arr = [];
            res.data.communityClassifyLabelList.map(item => {
              arr.push(item.id);
            });
            this.formData.labelIds = arr.toString();
          }
        });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getData();
      this.getLabelInfo();
    }
    this.getLabel();
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
.classify .form-control {
  clear: none !important;
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

