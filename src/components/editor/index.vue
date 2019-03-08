<template>
  <div id="editor">

  </div>
</template>

<script>
import WangEditor from "wangeditor";
import axios from "axios";
export default {
  name: "editor",
  data() {
    return {
      editor: null
    };
  },
  props: {
    value: {
      type: String
    }
  },
  methods: {},
  created() {
    let that = this;
    this.$nextTick(() => {
      this.editor = new WangEditor("#editor");
      this.editor.customConfig.uploadImgMaxLength = 5; //限制一次最多上传 5 张图片
      this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
      this.editor.customConfig.uploadImgHeaders = {
        "Content-type": "multipart/form-data"
      };
      this.editor.customConfig.customUploadImg = function(files, insert) {
        let formData = new FormData();
        formData.append("file", files[0]);
        that.$axios.upload("upload", formData).then(res => {
          insert(res.data.upload.url);
        });
      };
      this.editor.customConfig.onchange = function(html) {
        // html 即变化之后的内容
        that.$emit("input", html);
        that.$emit("getText", that.editor.txt.text());
        // that.$emit("getUrl", that.editor.txt.html());
      };
      this.editor.customConfig.zIndex = 10;
      this.editor.create();
    });
  },
  watch: {
    value(val) {
      this.editor.txt.html(val);
    }
  }
};
</script>

<style scoped>
</style>

