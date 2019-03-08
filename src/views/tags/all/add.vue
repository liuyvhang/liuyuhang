<template>
    <div class="container">
        <div class="top">
            <span>标签发布</span>
        </div>
        <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
            <div class="first">
                <el-form-item label="标签" prop="title">
                    <el-input v-model="formData.title" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="标签图">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="second">
                <el-form-item label="分类" prop="classify">
                    <el-select v-model="formData.classify" placeholder="请选择" size="small">
                        <el-option v-for="item in options1" :key="item.blockName" :label="item.blockName" :value="item.blockName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="纬度" prop="latitute">
                    <el-select v-model="formData.latitute" placeholder="请选择" size="small">
                        <el-option v-for="item in options2" :key="item.blockName" :label="item.blockName" :value="item.blockName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="third">
                <el-form-item label="作者" prop="author">
                    <el-input v-model="formData.author" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="标签描述" prop="summary">
                    <el-input v-model="formData.summary" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
                </el-form-item>
            </div>
            <div class="fourth">
                <el-form-item label="标签链接">
                    <el-input v-model="formData.url" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="权重" prop="weight">
                    <el-select v-model="formData.weight" placeholder="请选择" size="small">
                        <el-option v-for="item in options3" :key="item.blockName" :label="item.blockName" :value="item.blockName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加标签'">添加</el-button>
                <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑标签'">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    var checkTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("标签名不能为空"));
      }
      callback();
    };
    var checkClassify = (rule, value, callback) => {
      if (!value) {
        callback(new Error("分类不能为空"));
      }
      callback();
    };
    var checkLatitude = (rule, value, callback) => {
      if (!value) {
        callback(new Error("纬度不能为空"));
      }
      callback();
    };
    var checkAuthor = (rule, value, callback) => {
      if (!value) {
        callback(new Error("作者不能为空"));
      }
      callback();
    };
    var checkSummary = (rule, value, callback) => {
      if (!value) {
        callback(new Error("描述不能为空"));
      }
      callback();
    };
    return {
      formData: {
        title: "",
        author: "",
        classify: "",
        latitute: "",
        summary: "",
        url: "",
        weight: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标签名", trigger: "blur" }],
        classify: [{ required: true, message: "请选择分类", trigger: "change" }],
        latitute: [{ required: true, message: "请选择纬度", trigger: "change" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        summary: [{ required: true, message: "请输入描述", trigger: "blur" }]
      },
      options1: [
        { blockName: "足球" },
        { blockName: "电竞" },
        { blockName: "篮球" }
      ],
      options2: [
        { blockName: "赛事" },
        { blockName: "球员" },
        { blockName: "球队" }
      ],
      options3: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ],
      token: "",
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //   return isJPG && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(666);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(666);
        } else {
          console.log("error edit!!");
          return false;
        }
      });
    },
    getData() {
      console.log("nishizhu");
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData();
    }
    console.log(this.$route.query.id);
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
.second,
.third,
.fourth {
  padding: 27px 54px 26px 56px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
</style>

