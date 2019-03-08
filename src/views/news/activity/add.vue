<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
      <div class="first">
        <el-form-item label="活动名称">
          <el-input v-model="formData.activity_name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="活动图片" prop="activity_pic">
          <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="formData.activity_pic" :src="formData.activity_pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="频道">
          <el-select v-model="formData.channel_id" placeholder="请选择" size="small">
            <el-option v-for="item in options" :key="item.id" :label="item.channel_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-radio v-model="formData.activity_type" :label="0">报名 </el-radio>
          <el-radio v-model="formData.activity_type" :label="1">宣传</el-radio>
        </el-form-item>
        <el-form-item label="活动状态">
          <el-radio v-model="formData.state" :label="0">未开始 </el-radio>
          <el-radio v-model="formData.state" :label="1">进行中</el-radio>
          <el-radio v-model="formData.state" :label="2">已结束</el-radio>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="date" size="small" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate">
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item label="活动页URL">
          <el-input v-model="formData.activity_url" placeholder="请输入URL"></el-input>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="formData.activity_desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加资讯活动'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑资讯活动'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {activity_pic:""},
      options: [],
      date: "",
      rules: {
        //     title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        //     classify: [
        //       { required: true, message: "请选择分类", trigger: "change" }
        //     ],
        //     title_image: [
        //       { required: true, message: "请上传图片", trigger: "change" }
        //     ]
      }
    };
  },
  methods: {
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    handleAvatarSuccess(res, file) {
      this.formData.activity_pic = res.data.upload.url;
    },
    changeDate(val) {
      console.log(this.date);
      if (val) {
        this.formData.start_date = val[0];
        this.formData.end_date = val[1];
      }
    },
    restoreDate(a, b) {
      this.date = [new Date(a), new Date(b)];
      console.log(this.date);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            ...this.formData
          };
          console.log(data);
          this.$axios.post("addActivity", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "活动添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/news/activity" });
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
          this.$axios.post("updateActivity", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "活动编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/news/activity" });
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
        .get("infoActivity", { channel_activity_id: this.$route.query.id })
        .then(res => {
          this.formData = res.data.channel_activity;
          this.restoreDate(
            res.data.channel_activity.start_date,
            res.data.channel_activity.end_date
          );
        });
    },
    getChannel() {
      this.$axios.get("getChannel", { page: 1, channel_type: 1 }).then(res => {
        if (res.code == 200) {
          this.options = res.data.channel_list;
        }
      });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData();
    }
    this.getChannel();
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

