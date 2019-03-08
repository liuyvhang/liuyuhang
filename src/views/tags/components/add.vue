<template>
    <div class="container">
        <el-button type="primary" size="small" @click="dialogFormVisible = true">新增内容</el-button>
        <el-dialog title="添加板块" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="板块名称" label-width="120px">
                    <el-input v-model="formData.blockName" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="备注" label-width="120px">
          <el-input v-model="formData.remark" auto-complete="off"></el-input>
        </el-form-item> -->
                <!-- <el-form-item label="板块图标" label-width="120px">
          <el-upload action="/mgr/common/imgUpload" list-type="picture-card" accept="image/*" :limit="imgLimit"
            :file-list="productImgs" :multiple="isMultiple" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-error="imgUploadError">
            <i class="el-icon-plus"></i>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog> -->
                <!-- <img v-if="formData.img" :src="formData.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                <!-- </el-upload>
        </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false,submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "categoryAdd",
  data() {
    return {
      formData: {},
      category: [],
      dialogFormVisible: false
      // dialogImageUrl: '',
      // dialogVisible: false,
      // productImgs: [],
      // isMultiple: true,
      // imgLimit: 3
    };
  },
  methods: {
    submit() {
      var data = {
        page: 1
      };
      console.log(this.formData);
      this.$axios.get("addCategoryList", this.formData).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "分类添加成功",
            type: "success"
          });
          this.formData = {};
          var tableData = "";
          this.$emit("childByValue1", tableData);
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    handleRemove(file, fileList) {
      //移除图片
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //预览图片时调用
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      //文件上传之前调用做一些拦截限制
      console.log(file);
      const isJPG = true;
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      //图片上传成功
      console.log(res);
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleExceed(files, fileList) {
      //图片上传超过数量限制
      this.$message.error("上传图片不能超过6张!");
      console.log(file, fileList);
    },
    imgUploadError(err, file, fileList) {
      //图片上传失败调用
      console.log(err);
      this.$message.error("上传图片失败!");
    }
  }
};
</script>
<style>
</style>

<style lang="css">
</style>
<style scoped>
.container {
  padding-left: 20px;
}
</style>
