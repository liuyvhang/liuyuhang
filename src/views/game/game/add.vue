<template>
    <div class="container">
        <div class="top">
            <span>{{$route.name}}</span>
        </div>
        <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
            <div class="first">
                <el-form-item label="游戏名称" prop="game_name">
                    <el-input v-model="formData.game_name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="formData.game_pic" :src="formData.game_pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="second">
                <el-form-item label="状态" prop="is_valid">
                    <el-radio v-model="formData.is_valid" :label="0">无效</el-radio>
                    <el-radio v-model="formData.is_valid" :label="1">有效</el-radio>
                </el-form-item>
                <el-form-item label="排序值" prop="sort_val">
                    <el-select v-model="formData.sort_val" placeholder="请选择" size="small">
                        <el-option v-for="item in options3" :key="item.blockName" :label="item.blockName" :value="item.blockName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转链接">
                    <el-input v-model="formData.target_url" placeholder="请输入内容"></el-input>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加游戏'">添加</el-button>
                <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑游戏'">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      formData: { game_pic: "" },
      rules: {},
      options3: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ]
    };
  },
  methods: {
    uploadImgUrl() {
       return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    handleAvatarSuccess(res, file) {
      this.formData.game_pic = res.data.upload.url;
    },
    //添加
    submitForm(formName) {
      let data = {
        ...this.formData
      };
      console.log(data);
      this.$axios.post("addGame", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "游戏添加成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/game" });
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
      console.log(data);
      this.$axios.post("updateGame", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "游戏编辑成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/game" });
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
        .get("infoGame", { game_id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.game;
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

