<template>
  <div class="relative">
    <div class="classify">
      <v-selectpage class="form-control" :data="communityClassifyList" show-field="community_classify_name" v-model="classifyId" @values="singleValues" placeholder="请选择一个分类" style="width:200px">
      </v-selectpage>
    </div>
    <div class="handle">
      <el-button size="medium" type="primary" @click="sub" v-if="state" :disabled="classifyId.length>0?false:true"> 保存</el-button>
      <el-button size="medium" type="warning" @click="handle" v-if="!state" :disabled="classifyId.length>0?false:true"> 编辑</el-button>

    </div>
    <div class="label">
      <v-selectpage class="form-control" :data="communityClassifyLabelList" show-field="community_label_name" :multiple="true" :max-select-limit="3" v-model="labelId" @values="multipleValues" placeholder="请关联标签" ref="sp" style="width:350px">
      </v-selectpage>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      communityClassifyList: [
        { id: 1, community_classify_name: "篮球" },
        { id: 2, community_classify_name: "足球" },
        { id: 3, community_classify_name: "羽毛球" }
      ],
      communityClassifyLabelList: [
        { id: 4, community_label_name: "球队" },
        { id: 5, community_label_name: "球星" }
      ],
      classifyId: "",
      labelId: "",
      state: false
    };
  },
  methods: {
    singleValues(val) {
      if (val.length > 0) {
        this.getRelative();
      } else {
        this.$refs.sp.$emit("clear", true);
      }
    },
    getRelative() {
      this.$axios
        .get("getRelativeLabel", { classifyId: this.classifyId, page: 1 })
        .then(res => {
          if (res.code == 200) {
            var arr = [];
            res.data.communityClassifyLabelList.map(item => {
              arr.push(item.id);
            });
            this.labelId = arr.toString();
          }
        });
    },
    multipleValues(val) {
      console.log(val);
      console.log(this.labelId);
    },
    handle() {
      this.state = true;
      this.$refs.sp.$emit("disabled", false);
    },
    sub() {
      this.$axios
        .get("addRelative", {
          classifyId: this.classifyId,
          labelId: this.labelId
        })
        .then(res => {
          if (res.code == 200) {
            this.getRelative();
            this.$message.success("标签编辑成功");
          }
        });
      this.state = false;
      this.$refs.sp.$emit("disabled", true);
    },
    getClassify() {
      this.$axios.get("getClassify", { page: 1 }).then(res => {
        this.communityClassifyList = res.data.communityClassifyList;
      });
    },
    getLabel() {
      this.$axios.get("getLabelList", { page: "" }).then(res => {
        this.communityClassifyLabelList = res.data.communityClassifyLabelList;
      });
    }
  },
  mounted() {
    this.$refs.sp.$emit("disabled", true);
    this.getClassify();
    this.getLabel();
  },
  watch: {
    classifyId(val) {
      if (val.length == 0) {
        this.$refs.sp.$emit("disabled", true);
        this.state = false;
        this.$refs.sp.$emit("clear", true);
      }
    }
  }
};
</script>
<style scoped>
.relative {
  width: 80%;
  display: flex;
  justify-content: center;
}
.classify {
  margin-right: 50px;
}
.handle {
  margin-right: 10px;
}
</style>
