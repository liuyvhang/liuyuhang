<template>
  <div>
    <!-- <el-progress :percentage="percent" v-if="percent>0" :status="status"></el-progress>
    <label id="content" :class="bindClass">
      <i class="el-icon-plus add" v-if="!isButton"></i>
      <span v-if="isButton">上传视频</span>
      <input type="file" id="btn" class="button">
    </label> -->
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "upload",
  props: {
    isButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      percent: 0
    };
  },
  methods: {
    uploadVideo() {
      console.log(1111);
      this.$axios.uploadVideo("getDown").then((percent, res) => {
        let loaded = res.loaded,
          total = res.total;
        this.$nextTick(() => {
          this.precent = (loaded / total) * 100;
        });
        let params = {
          ...bkData,
          key: data.key
        };
        this.$emit("uploadSuccess", params);
        this.percent = percent;
        this.$emit("getPercent", percent);
      });
    }
  },
  created() {
    this.uploadVideo();
  },
  computed: {
    status() {
      return this.percent == 100 ? "success" : "";
    },
    bindClass() {
      if (this.isButton) {
        return "el-button el-button--primary";
      } else {
        return "content";
      }
    }
  }
};
</script>

<style scoped>
.content {
  display: block;
  width: 150px;
  text-align: center;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  cursor: pointer;
}

.button {
  display: none;
}

.add {
  height: 150px;
  line-height: 150px;
  font-size: 50px;
  color: #ccc;
}
</style>
