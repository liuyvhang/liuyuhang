<template>
  <div>
    <el-button class="slot-t-top" type="primary" size="small" @click="dialogFormVisible = true">添加规则</el-button>
    <!-- 添加规则 -->
    <el-dialog title="添加规则" :visible.sync="dialogFormVisible" @close="closeDialog('tagsData')">
      <el-form ref="tagsData" :model="tagsData" label-width="80px" :rules="rules">
        <el-form-item label="规则" prop="expression">
          <el-input v-model="tagsData.expression" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="优先级">
          <el-select v-model="tagsData.priority_level" placeholder="请选择" size="small">
            <el-option v-for="item in options2" :key="item.blockName" :label="item.blockName" :value="item.blockName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false ">取消</el-button>
        <el-button type="primary" @click="submit('tagsData')">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    editId: {
      type: String
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      tagsData: {},
      options2: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ],
      rules: {
        expression: [{ required: true, message: "请输入规则", trigger: "blur" }]
      },
      msg: ""
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            ...this.tagsData,
            label_id: this.editId
          };
          console.log(data);
          this.$axios.post("addAnalysis", data).then(res => {
            console.log(res);
            console.log("添加规则成功");
            this.$emit("refresh", this.editId);
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closeDialog(formName) {
      this.tagsData = {};
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.slot-t-top {
  margin-bottom: 15px;
}
</style>
