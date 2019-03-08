<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="模板名称">
        <el-input v-model="formData.templare_name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="是否有效">
        <el-radio v-model="formData.is_valid" :label="0">无效 </el-radio>
        <el-radio v-model="formData.is_valid" :label="1">有效</el-radio>
      </el-form-item>
      <el-form-item label="模板内容">
        <el-input v-model="formData.templare_content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='新增模板'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑模板'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {}
    };
  },
  methods: {
    //添加
    submitForm(formName) {
      console.log(this.$refs.formData);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            hot_val: this.formData.hot_val,
            label_name: this.formData.label
          };
          console.log(data);
          this.$axios.post("addTemplate", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "消息添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/message/template" });
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
          let data = {
            hot_val: this.formData.hot_val,
            id: this.formData.id,
            label_name: this.formData.label
          };
          console.log(data);
          this.$axios.post("updateTemplate", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "消息模板编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/message/template" });
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
        .get("infoTemplate", { msg_tpl_id: this.$route.query.id })
        .then(res => {
          this.formData = res.data.msg_tpl;
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

