<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
      <div class="first">
        <el-form-item label="频道名称" prop="channel_name">
          <el-input v-model="formData.channel_name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="频道图标">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="频道类型" prop="channel_type">
          <el-select v-model="formData.channel_type" placeholder="请选择" size="small">
            <el-option v-for="item in options1" :key="item.blockName" :label="item.blockName" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="频道模块" prop="channel_module">
          <el-select v-model="formData.channel_module" placeholder="请选择" size="small">
            <el-option v-for="item in options3" :key="item.blockName" :label="item.blockName" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="频道描述" prop="channel_desc">
          <el-input v-model="formData.channel_desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item label="排序值" prop="sort_val">
          <el-select v-model="formData.sort_val" placeholder="请选择" size="small">
            <el-option v-for="item in options2" :key="item.blockName" :label="item.blockName" :value="item.blockName">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="跳转地址" v-if="formData.channel_type==1" prop="url">
          <el-input v-model="formData.url" placeholder="请输入内容"></el-input>
        </el-form-item> -->
        <el-form-item label="跳转地址" prop="url">
          <el-input v-model="formData.url" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="默认" prop="is_default">
          <el-radio v-model="formData.is_default" :label="1">是</el-radio>
          <el-radio v-model="formData.is_default" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="删除" prop="is_remove">
          <el-radio v-model="formData.is_remove" :label="1">是</el-radio>
          <el-radio v-model="formData.is_remove" :label="0">否</el-radio>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加频道'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑频道'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {
        channel_name: [
          { required: true, message: "请输入频道名", trigger: "blur" }
        ],
        channel_desc: [
          { required: true, message: "请输入频道描述", trigger: "blur" }
        ],
        is_default: [
          { required: true, message: "请选择是否默认", trigger: "change" }
        ],
        is_remove: [
          { required: true, message: "请选择是否可以删除", trigger: "change" }
        ],
        sort_val: [
          { required: true, message: "请选择排序值", trigger: "change" }
        ],
        channel_type: [
          { required: true, message: "请选择频道类型", trigger: "change" }
        ],
        channel_module: [
          { required: true, message: "请选择频道模块", trigger: "change" }
        ],
        url: [{ required: true, message: "请输入活动地址", trigger: "blur" }]
      },
      options1: [
        { blockName: "资讯", value: 0 },
        { blockName: "活动", value: 1 }
      ],
      options3: [
        { blockName: "资讯", value: 0 },
        { blockName: "视频", value: 1 }
      ],
      options2: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ],
      options4: [
        { blockName: "APP轮播", value: 0 },
        { blockName: "Banner页", value: 1 }
      ]
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
          let data = {
            ...this.formData
          };
          console.log(data);
          this.$axios.post("addChannel", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "频道添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/tags/channel" });
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
            id: this.$route.query.id
          };
          console.log(data);
          this.$axios.post("updateChannel", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "频道编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/tags/channel" });
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
    getData() {
      this.$axios
        .get("infoChannel", { channel_id: this.$route.query.id })
        .then(res => {
          console.log(res);
          this.formData = res.data.channel;
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

