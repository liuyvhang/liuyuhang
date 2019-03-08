<template>
    <div class="add">
        <el-button size="small" type="primary" @click="dialogFormVisible=true,getData()">查找攻略</el-button>
        <!-- 添加节点 -->
        <el-dialog title="查找攻略" :visible.sync="dialogFormVisible" @close="closeDialog('tagsData')" >
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
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
    },
    level: {
      type: Number
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      tagsData: {}
    };
  },
  methods: {
    getData() {
      if (this.level == 0) {
        this.$axios
          .get("infoChannel", { channel_id: this.editId })
          .then(res => {
            console.log(res);
            this.parent = res.data.label;
          });
      } else {
        this.$axios.get("infoLabel", { label_id: this.editId }).then(res => {
          this.parent = res.data.label;
        });
      }
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.level == 0) {
            let data = {
              ...this.tagsData,
              parent_id: "",
              label_level: this.level + 1,
              channel_id: this.editId
            };
            console.log(data);
            this.$axios.post("addLabel", data).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "节点添加成功"
                });
                this.$emit("refresh", this.editId);
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
              }
            });
          } else {
            let data = {
              ...this.tagsData,
              parent_id: this.parent.id,
              label_level: this.parent.label_level + 1,
              channel_id: this.parent.channel_id
            };
            console.log(data);
            this.$axios.post("addLabel", data).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "节点添加成功"
                });
                this.$emit("refresh", this.editId);
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
              }
            });
          }
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
    closeDialog(formName) {
      this.tagsData = {};
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>
