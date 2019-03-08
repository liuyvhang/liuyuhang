<template>
  <div>
    <el-form :model="formData" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload action="#" list-type="picture-card" accept="image/*" :limit="imgLimit" :file-list="productImgs"
          :multiple="isMultiple" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-error="imgUploadError">
          <i class="el-icon-plus"></i>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <!-- <img v-if="formData.img" :src="formData.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </el-form-item>
      <el-form-item>
        <editor v-model="formData.content" @getText="getText"></editor>
        <!-- <quill-editor v-model="formData.content" @getText="getText"></quill-editor> -->
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="submit" v-if="$route.name=='新闻添加页'">保存</el-button>
        <el-button type="danger" @click="saveEdit" v-if="$route.name=='新闻编辑页'">保存更改</el-button>
      </el-form-item>
      <el-form-item></el-form-item>
    </el-form>
  </div>
</template>
<script>
  import editor from "@/components/editor/index";
  // import quillEditor from "@/components/quill/index";
  export default {
    name: "newsUpdate",
    components: {
      editor,
      // quillEditor
    },
    data() {
      return {
        formData: {
          title: "",
          author: "",
          img: "",
          content: "",
          contentText: ""
        },
        token: "",
        dialogImageUrl: '',
        dialogVisible: false,
        productImgs: [],
        isMultiple: true,
        imgLimit: 3
      };
    },
    methods: {
      getText(val) {
        this.formData.contentText = val;
      },
      // getUrl(url) {
      //   this.formData.content += `<img src="${url}" />`;
      // },
      submit() {
        this.$axios.post("addNews", this.formData).then(res => {
          if (res.code == 200) {
            this.$message({
              message: "新闻添加成功",
              type: "success"
            });
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
          setTimeout(() => {
            this.$router.push("/news");
          }, 1500);
        });
      },
      getData() {
        this.$axios.get("getNews", {
            id: this.$route.query.id
          })
          .then(res => {
            // console.log(res),
            this.formData = res.data[0];
          });
      },
      saveEdit() {
        let params = {
          ...this.formData,
          id: this.$route.query.id
        };
        console.log(params.id)
        this.$axios.post("updateNews", params).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: "新闻更改成功",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("/news");
            }, 1000);
          }
        });
      },
      handleRemove(file, fileList) { //移除图片
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) { //预览图片时调用
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) { //文件上传之前调用做一些拦截限制
        console.log(file);
        const isJPG = true;
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) { //图片上传成功
        console.log(res);
        console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleExceed(files, fileList) { //图片上传超过数量限制
        this.$message.error('上传图片不能超过6张!');
        console.log(file, fileList);
      },
      imgUploadError(err, file, fileList) { //图片上传失败调用
        console.log(err)
        this.$message.error('上传图片失败!');
      }
    },
    created() {
      if (this.$route.name == "新闻编辑页") {
        this.getData();
      }
    },
    watch: {
      $route(to, from, next) {
        this.formData = {
          title: "",
          author: "",
          img: "",
          content: "",
          contentText: ""
        }
      }
    }
  };

</script>
<style>


</style>

<style lang="css">
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
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
