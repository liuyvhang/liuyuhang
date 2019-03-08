<template>
  <div>
    <el-button size="mini" type="warning" @click="del">删除</el-button>
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
      msg: "h"
    };
  },
  methods: {
    del() {
      //是否删除
      this.$confirm("是否删除此节点？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //二次判断,是否删除父节点
          this.$axios.get("delLabel", { label_ids: this.editId }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "已成功删除"
              });
              this.$emit("refresh", this.editId);
            } else {
              this.$message({
                type: "warning",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
</style>
