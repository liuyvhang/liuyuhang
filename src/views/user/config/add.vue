<template>
  <div>{{$route.name}}</div>
</template>
<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form
      ref="formData"
      :model="formData"
      label-width="100px"
      :rules="rules"
    >
      <div class="first">
        <el-form-item
          label="配置项"
          prop="conf_item"
        >
          <el-select
            v-model="formData.conf_item"
            @change="change"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="formData.conf_item=='0'||formData.conf_item=='1'||formData.conf_item=='2'||formData.conf_item=='3'"
          label="配置类型"
          prop="conf_type"
        >
          <el-radio
            v-model="formData.conf_type"
            v-if="formData.conf_item=='0'"
            :label="0"
            name="singal"
          >单次签到奖励积分</el-radio>
          <el-radio
            v-model="formData.conf_type"
            v-if="formData.conf_item=='0'"
            :label="1"
            name="singal"
          >单次签到奖励道具</el-radio>
          <el-input-number
            v-model="formData.conf_type"
            v-if="formData.conf_item=='1'"
            :min="1"
            label="连续签到次数"
          ></el-input-number>
          <el-radio
            v-model="formData.conf_type"
            v-if="formData.conf_item=='2'"
            :label="0"
            name="bonus"
          >红包奖励</el-radio>
          <el-radio
            v-model="formData.conf_type"
            v-if="formData.conf_item=='3'"
            :label="0"
            name="active"
          >浏览资讯数 </el-radio>
          <el-radio
            v-model="formData.conf_type"
            v-if="formData.conf_item=='3'"
            :label="1"
            name="active"
          >评论资讯数 </el-radio>
          <el-radio
            v-model="formData.conf_type"
            v-if="formData.conf_item=='3'"
            :label="2"
            name="active"
          >加入社群数 </el-radio>
          <el-radio
            v-model="formData.conf_type"
            v-if="formData.conf_item=='3'"
            :label="3"
            name="active"
          >发帖数 </el-radio>
          <el-radio
            v-model="formData.conf_type"
            v-if="formData.conf_item=='3'"
            :label="4"
            name="active"
          >签到数 </el-radio>
        </el-form-item>
        <el-form-item
          label="配置值"
          prop="conf_value"
        >
          <el-input v-model="formData.conf_value"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('formData')"
          v-if="$route.name=='添加通用配置'"
        >添加</el-button>
        <el-button
          type="primary"
          @click="editForm('formData')"
          v-if="$route.name=='编辑通用配置'"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      options: [
        { id: "0", label: "签到配置" },
        { id: "1", label: "连续签到配置" },
        { id: "2", label: "邀请红包奖励" },
        { id: "3", label: "邀请激活配置" }
      ],
      rules: {
        conf_item: [
          { required: true, message: "请选择配置项", trigger: "change" }
        ],
        conf_type: [
          { required: true, message: "请选择配置类型", trigger: "change" }
        ],
        conf_value: [
          { required: true, message: "请输入配置值", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    change() {
      this.$set(this.formData, "conf_type", "");
    },
    //添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.formData);
          this.$axios.post("addUserConf", this.formData).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "签到配置添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/user/config" });
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
          this.$axios.post("updateUserConf", this.formData).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "签到配置编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/user/config" });
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
              console.log("error edit!!");
              return false;
            }
          });
        }
      });
    },
    //获取数据回填
    getData() {
      this.$axios
        .get("infoUserConf", { id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.conf;
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

