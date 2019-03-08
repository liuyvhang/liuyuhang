<template>
  <div class="useradd">
    <div class="top">
      <span>新增用户</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
      <div class="first">
        <el-form-item label="用户名" prop="nick_name">
          <el-input v-model="formData.nick_name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="user_phone">
          <el-input v-model="formData.user_phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="user_pwd" v-if="!$route.query.id">
          <el-input type="password" v-model="formData.user_pwd" auto-complete="new-password" placeholder="请输入密码"></el-input>
        </el-form-item> -->
      </div>
      <div class="second">
        <el-form-item label="头像" prop="head_img">
          <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="formData.head_img" :src="formData.head_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="背景图" prop="bg_img">
          <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
            <img v-if="formData.background_pic" :src="formData.background_pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别" prop="user_sex">
          <el-radio v-model="formData.user_sex" :label="0">男</el-radio>
          <el-radio v-model="formData.user_sex" :label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="认证" prop="is_certified">
          <el-radio v-model="formData.is_certified" :label="0">是</el-radio>
          <el-radio v-model="formData.is_certified" :label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="所属分类" prop="user_category">
          <v-selectpage v-model="formData.user_category" :data="options" key-field="label" :multiple="true" :max-select-limit="5" @values="multipleValues" show-field="label" class="form-control" style="width:200px;">
          </v-selectpage>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item label="年龄" prop="user_age">
          <el-input type="number" v-model.number="formData.user_age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.user_email" placeholder="请输入邮箱" type="email"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="formData.introduction" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="city">
          <el-input v-model="formData.city" placeholder="请输入联系地址"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加用户'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑用户'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    // var checkEmail = (rule, value, callback) => {
    //   let mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //   // if (!value) {
    //   //   return callback(new Error("不能为空"));
    //   // }
    //   if (!mal.test(value)) {
    //     callback(new Error("请输入正确邮箱"));
    //   } else {
    //     callback();
    // //   }
    // };
    return {
      formData: {
        head_img: "",
        background_pic: ""
      },
      rules: {
        nick_name: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        user_phone: [{ validator: checkPhone, required: true, trigger: "blur" }]
        // user_email: [{ validator: checkEmail, trigger: "blur" }],
        // user_age: [
        //   { required: true, message: "年龄不能为空", trigger: "blur" },
        //   { type: "number", message: "年龄必须为数字值", trigger: "blur" }
        // ],
        // user_pwd: [
        //   {
        //     required: true,
        //     message: "密码不能为空",
        //     trigger: "blur"
        //   }
        // ]
        // user_sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      imageUrl: "",
      options: [],
      values: []
    };
  },
  methods: {
    multipleValues(val) {
      this.values = [];
      val.map(item => {
        this.values.push(item.label);
      });
    },
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    handleAvatarSuccess(res, file) {
      this.formData.head_img = res.data.upload.url;
      console.log(this.formData);
    },
    handleAvatarSuccess1(res, file) {
      this.formData.background_pic = res.data.upload.url;
      console.log(this.formData);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.common.errorTip("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      if (!isLt2M) {
        this.common.errorTip("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            ...this.formData,
            user_login_type: 1,
            user_category: this.values.toString(),
            user_pwd: "badoutiyu!@#321"
          };
          console.log(data);
          this.$axios.get("addUser", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "添加用户成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/user/all" });
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
          let data = {
            ...this.formData,
            user_login_type: 1,
            user_category: this.values.toString(),
            user_pwd: "badoutiyu!@#321"
          };
          console.log(data);
          this.$axios.get("updateUser", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "编辑用户成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/user/all" });
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
    getData() {
      this.$axios
        .get("infoUser", { user_id: this.$route.query.id })
        .then(res => {
          console.log(res);
          this.formData = res.data.userInfo;
        });
    },
    getOptions() {
      this.$axios.get("getLabel", { parent_id: "0" }).then(res => {
        console.log(res);
        this.options = res.data.label_list;
      });
    }
  },
  created() {
    this.getOptions();
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
.useradd .form-control {
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
.first,
.second,
.third,
.fourth {
  padding: 27px 54px 26px 56px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
</style>

