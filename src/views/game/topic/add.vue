<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
      <div class="first">
        <el-form-item label="题目名称">
          <el-input v-model="formData.subject_name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="题目类型">
          <el-select v-model="formData.subject_type" placeholder="请选择" size="small">
            <el-option v-for="item in type" :key="item.label" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="选项类型" prop="option_type">
          <el-radio-group v-model="formData.option_type" @change="changeType">
            <el-radio :label="0">单选</el-radio>
            <el-radio :label="1">多选</el-radio>
            <el-radio :label="2">判断</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="is_valid">
          <el-radio v-model="formData.is_valid" :label="0">无效</el-radio>
          <el-radio v-model="formData.is_valid" :label="1">有效</el-radio>
        </el-form-item>
        <el-form-item label="难度级别" prop="difficulty_level">
          <el-select v-model="formData.difficulty_level" placeholder="请选择" size="small">
            <el-option v-for="item in level" :key="item.blockName" :label="item.blockName" :value="item.blockName">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item v-for="(item, index) in formData.subject_option" :label="'选项' + (index+1)" :key="index" :prop="'subject_option.' + index + '.value'" :rules="{required: true, message: '选项不能为空', trigger: 'blur'}" class="option">
          <el-input v-model="item.value" style="width:500px;"></el-input>
          <el-button v-if="index>1" @click.prevent="removeOption(item)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addOption(formData.subject_option.length)" v-if="formData.subject_option.length<10">新增选项</el-button>
        </el-form-item>
      </div>
      <div class="fourth">
        <!-- <el-form-item label="选项答案">
          <el-select v-if="formData.subject_option.length>0" v-model="formData.subject_answer_index" :multiple="formData.option_type==1?true:false" placeholder="请选择" size="small" @change="changeAnswer" value-key="value">
            <el-option v-for="(item,index) in formData.subject_option" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="选项答案">
          <el-select v-model="formData.subject_answer_index" multiple placeholder="请选择" size="small" @change="changeAnswer" value-key="value" :multiple-limit="formData.option_type==1?0:1">
            <el-option v-for="(item,index) in formData.subject_option" :key="index" :label="item.index" :value="item.index">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加题目'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑题目'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        subject_option: [{ value: "", index: 1 }, { value: "", index: 2 }],
        subject_answer_index: []
      },
      rules: {},
      type: [
        { label: "综合" },
        { label: "篮球" },
        { label: "足球" },
        { label: "羽毛球" }
      ],
      level: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ]
    };
  },
  methods: {
    changeAnswer(val) {
      console.log(val);
    },
    changeType(val) {
      console.log(val);
    },
    //添加
    submitForm(formName) {
      let arr = [];
      this.formData.subject_option.map(item => {
        arr.push(item.value);
      });
      console.log(arr);
      let data = {
        ...this.formData,
        subject_answer_index: this.formData.subject_answer_index.toString(),
        subject_option: arr
      };
      this.$axios.post("addTopic", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "题目添加成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/topic" });
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
        ...this.formData,
        subject_answer_index: this.formData.subject_answer_index.toString()
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
    // 添加选项
    addOption(val) {
      this.formData.subject_option.push({
        value: "",
        index: val + 1
      });
    },
    removeOption(item) {
      var index = this.formData.subject_option.indexOf(item);
      if (index !== -1) {
        this.formData.subject_option.splice(index, 1);
      }
    },
    //获取数据回填
    getData() {
      this.$axios
        .get("infoTopic", { subject_id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.question_subject;
            let arr = [];
            res.data.question_subject.subject_option.map((item, index) => {
              let data = {
                value: item,
                index: index + 1
              };
              arr.push(data);
            });
            this.formData.subject_option = arr;
            this.formData.subject_answer_index = res.data.question_subject.subject_answer_index.split(
              ","
            );
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
.second,
.third,
.fourth {
  padding: 27px 54px 26px 56px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
</style>

