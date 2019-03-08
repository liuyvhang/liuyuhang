<template>
  <div class="videoUp">
    <el-form
      :model="formData"
      label-width="80px"
    >
      <el-form-item label="视频标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="视频头图">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgUrl()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="formData.video_head_img"
            :src="formData.video_head_img"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频分类">
        <el-select
          v-model="formData.type"
          placeholder="请选择"
          @change="selCate"
        >
          <el-option
            v-for="(item, index) in category"
            :key="index"
            :value="item._id"
            :label="item.title"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频作者">
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item label="视频上传">
        <upload
          @uploadSuccess="upSuccess"
          @getPercent="getPercent"
          :isButton="true"
        ></upload>
        <videoPlayer
          :options="playerOptions"
          class="video"
          v-if="playerOptions.sources[0].src"
        ></videoPlayer>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="update"
          :loading="sending"
          v-if="$route.name == '编辑短视频'"
        >
          保存更改
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="save"
          :loading="sending"
          v-else
        >
          保存
        </el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import upload from "../../../components/uploadVideo";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  name: "index",
  components: {
    upload,
    videoPlayer
  },
  data() {
    return {
      formData: {
        video_head_img: ""
      },
      percent: 0,
      playerOptions: {
        language: "zh",
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
        ],
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        poster: "" //视频头图地址
      },
      sending: false,
      category: []
    };
  },
  methods: {
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    handleAvatarSuccess(res, file) {
      this.formData.video_head_img = res.data.upload.url;
    },
    upSuccess(res) {
      this.formData.video = res.data;
      this.playerOptions.sources[0].src = res.data;
    },
    getPercent(percent) {
      this.percent = percent;
    },
    save() {
      this.sending = true;
      this.$axios.post("addVideo", this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success("视频添加成功");
        } else {
          this.$message.warning(res.msg);
        }
        this.sending = false;
      });
    },
    getImgUrl(val) {
      this.playerOptions.poster = val;
    },
    getSelect() {
      this.$axios.get("getCategory").then(res => {
        this.category = res.data;
      });
    },
    selCate(val) {
      let selected = this.category.find(item => {
        return item._id == val;
      });
      this.formData.sort = selected.sort;
    },
    getData() {
      this.$axios.get("getVideo", { id: this.$route.query.id }).then(res => {
        this.formData = res.data;
        this.playerOptions.poster = res.data.img;
        this.$axios.get("getDown", { key: res.data.key }).then(backData => {
          this.playerOptions.sources[0].src = backData.data;
          this.formData.video = backData.data;
        });
      });
    },
    update() {
      let params = {
        id: this.$route.query.id,
        ...this.formData
      };
      this.$axios.post("updateVideo", params).then(res => {
        if (res.code == 200) {
          this.$message.success("视频编辑成功");
        }
      });
    }
  },
  mounted() {
    this.getSelect();
    if (this.$route.name == "编辑短视频") {
      this.getData();
    }
  }
};
</script>


<!--overwrite style-->
<style>
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.video-js {
  width: 640px;
  height: 360px;
}
.videoUp .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.videoUp .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.videoUp .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}

.videoUp .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style scoped>
.videoUp {
  padding-top: 20px;
  padding-right: 20px;
}
.video {
  margin-top: 20px;
}
</style>
