<template>
    <div>
        <el-button class="slot-t-top" type="primary" size="small" @click="dialogFormVisible = true,getData()">编辑</el-button>
        <el-dialog title="编辑规则" :visible.sync="dialogFormVisible" @close="closeDialog('tagsData')">
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
                <el-button type="primary" @click="submit('tagsData')">保存</el-button>
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
    getData() {
      this.$axios
        .get("infoAnalysis", { label_analysis_id: this.editId })
        .then(res => {
          this.tagsData = res.data.label_analysis;
        });
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            ...this.tagsData
          };
          console.log(data);
          this.$axios.post("updateAnalysis", data).then(res => {
            console.log(res);
            console.log("更新成功");
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
</style>
