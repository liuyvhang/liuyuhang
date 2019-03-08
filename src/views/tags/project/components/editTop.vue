<template>
    <div>
        <el-button class="slot-t-top" type="primary" size="small" @click="dialogFormVisible = true,getData()">编辑</el-button>
        <el-dialog title="编辑标签" :visible.sync="dialogFormVisible" @close="closeDialog('tagsData')">
            <el-form ref="tagsData" :model="tagsData" label-width="80px" :rules="rules">
                <div class="first">
                    <el-form-item label="标签名称" prop="label">
                        <el-input v-model="tagsData.label" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
                <div class="second">
                    <el-form-item label="关联类型">
                        <el-radio v-model="tagsData.relation_type" :label="0">0</el-radio>
                        <el-radio v-model="tagsData.relation_type" :label="1">1</el-radio>
                    </el-form-item>
                    <el-form-item label="标签描述">
                        <el-input v-model="tagsData.label_desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </div>
                <div class="third">
                    <el-form-item label="排序值">
                        <el-select v-model="tagsData.sort_val" placeholder="请选择" size="small">
                            <el-option v-for="item in options2" :key="item.blockName" :label="item.blockName" :value="item.blockName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
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
        label: [{ required: true, message: "请输入标签名", trigger: "blur" }]
      },
      msg: ""
    };
  },
  methods: {
    getData(){
        this.$axios.get('infoSimilar',{label_similar_id:this.editId}).then(res=>{
            this.tagsData = res.data.label_similar
        })
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            ...this.tagsData,
          };
          console.log(data);
          this.$axios.post("updateSimilar", data).then(res => {
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
