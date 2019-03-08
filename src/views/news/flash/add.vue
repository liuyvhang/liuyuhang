<template>
    <div class="newsAdd">
        <div class="top">
            <span>{{$route.name}}</span>
        </div>
        <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
            <div class="first">
                <el-form-item label="快讯图片">
                    <el-upload class="avatar-uploader" :action="uploadImgUrl()" multiple :on-exceed="handleExceed" :file-list="formData.title_imgs" list-type="picture-card" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :limit="3">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="second">
                <el-form-item label="来源">
                    <el-input v-model="formData.source" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="来源图标" prop="source_icon">
                    <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleIconSuccess">
                        <img v-if="formData.source_icon" :src="formData.source_icon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="fourth">
                <el-form-item label="内容" prop="content">
                    <editor v-model="formData.content"></editor>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加快讯'">添加</el-button>
                <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑快讯'">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import editor from "@/components/editor/index";
export default {
  components: {
    editor
  },
  data() {
    return {
      formData: {
        title_imgs: [],
        source_icon:""
      },
      rules: {},
      values: "", //添加标签组
      options: [
        { label: 1 },
        { label: 2 },
        { label: 3 },
        { label: 4 },
        { label: 5 }
      ],
      options1: [
        { channel_name: "足球", id: 1 },
        { channel_name: "篮球", id: 2 }
      ],
      options2: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
        //   sport_item: [
        //     { required: true, message: "请选择分类", trigger: "change" }
        //   ],
        // values: [{ required: true, message: "请选择标签", trigger: "change" }]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      let data = {
        name: `${file.name}`,
        url: res.data.upload.url
      };
      this.formData.title_imgs.push(data);
    },
    handleIconSuccess(res, file) {
      console.log(res);
      this.formData.source_icon = res.data.upload.url;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "img/jpeg";
      // const isGIF = file.type === "img/gif";
      // const isPNG = file.type === "img/png";
      // const isBMP = file.type === "img/bmp";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG && !isGIF && !isPNG && !isBMP) {
      //   this.common.errorTip("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      // }
      // if (!isLt2M) {
      //   this.common.errorTip("上传图片大小不能超过 2MB!");
      // }
      // return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    handleRemove(file, fileList) {
      this.formData.title_imgs = fileList;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 3 个文件`);
    },
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //图片拼接
          let imgs = [];
          this.formData.title_imgs.map(item => {
            imgs.push(item.url);
          });
          let data = {
            ...this.formData,
            data_type: 1,
            title_imgs: imgs
          };
          console.log(data);
          this.$axios.post("addNews", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "快讯添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/news/flash" });
            }
          });
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
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let imgs = [];
          this.formData.title_imgs.map(item => {
            imgs.push(item.url);
          });
          let data = {
            ...this.formData,
            id: this.$route.query.id,
            title_imgs: imgs
          };
          this.$axios.post("updateNews", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "快讯编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/news/flash" });
            }
          });
        } else {
          this.$message({
            type: "warning"
            // message: res.msg
          });
          console.log("error edit!!");
          return false;
        }
      });
    },
    getData() {
      this.$axios
        .get("infoNews", { news_id: this.$route.query.id })
        .then(res => {
          this.formData = res.data.news;
          let imgs = [];
          res.data.news.title_imgs.map((item, index) => {
            let data = {
              name: `${index}`,
              url: item
            };
            imgs.push(data);
          });
          this.formData.title_imgs = imgs;
        });
    }
  },
  created() {
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
.newsAdd .form-control {
  clear: none !important;
}
</style>

 <style scoped>
.newsAdd {
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
.box-card {
  display: flex;
  margin-top: 20px;
}
.tagBox {
  display: inline;
  margin-left: 10px;
}
</style>

