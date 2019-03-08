<template>
  <div class="videoUp">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form
      :model="formData"
      label-width="80px"
    >
      <div class="first">
        <el-form-item label="视频标题">
          <el-input
            v-model="formData.title"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="视频头图">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgUrl()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="formData.title_imgs"
              :src="formData.title_imgs"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="second">
        <!-- <el-form-item label="视频分类">
          <el-select
            v-model="formData.type"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in category"
              :key="index"
              :value="item.id"
              :label="item.channel_name"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="视频作者">
          <el-input
            v-model="formData.author_id"
            placeholder="请输入作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input
            v-model="formData.summary"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item label="标签">
          <el-select
            v-model="values"
            multiple
            filterable
            allow-create
            placeholder="请添加标签"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权重">
          <el-select
            v-model="formData.weigh"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in options2"
              :key="item.blockName"
              :label="item.blockName"
              :value="item.blockName"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item label="视频上传">
          <!-- <upload @uploadSuccess="upSuccess" @getPercent="getPercent" :isButton="true"></upload> -->
          <el-upload
            class="upload-demo"
            :action="uploadVideo()"
            :file-list="fileList"
            :on-success="upSuccess"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :limit="1"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
          </el-upload>
          <videoPlayer
            :options="playerOptions"
            class="video"
            v-if="playerOptions.sources[0].src"
          ></videoPlayer>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="update"
          :loading="sending"
          v-if="$route.name == '编辑视频'"
        >
          保存
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="save"
          :loading="sending"
          v-else
        >
          添加
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  name: "index",
  components: {
    videoPlayer
  },
  data() {
    return {
      formData: {
        title_imgs: "",
        video_url: ""
      },
      percent: 0,
      values: "", //添加标签组
      options: [], //标签
      fileList: [],
      options2: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ], //权重
      playerOptions: {
        language: "zh-CN",
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
          // {
          //   type: "application/x-mpegURL",
          //   src:
          //     "http://220.180.30.22:1936/live/stream:cctv13.stream/playlist.m3u8"
          // }
        ],
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        poster: "", //视频头图地址
        preload: "auto",
        aspectRatio: "16:9"
      },
      sending: false,
      category: [] //频道
    };
  },
  methods: {
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    uploadVideo() {
      return `${process.env.BASE_API}systemApiService/upload/file`;
    },
    handleAvatarSuccess(res, file) {
      this.formData.title_imgs = res.data.upload.url;
      this.playerOptions.poster = res.data.upload.url;
    },
    upSuccess(res, file) {
      console.log(res);
      this.formData.video_url = res.data.upload.url;
      this.playerOptions.sources[0].src = res.data.upload.url;
    },
    handleExceed(files, fileList) {
      this.$message.warning("最多上传一个文件");
    },
    handleRemove() {
      this.playerOptions.sources[0].src = "";
      this.formData.video_url = "";
    },
    save() {
      this.sending = true;
      let imgs = [];
      imgs.push(this.formData.title_imgs);
      let tags = [];
      tags = tags.concat(this.values);
      tags = [...new Set(tags)];
      tags = tags.join(" ");
      let data = {
        ...this.formData,
        tag: tags,
        title_imgs: imgs,
        data_type: 2
      };
      console.log(data);
      this.$axios.post("addNews", data).then(res => {
        if (res.code == 200) {
          this.$message.success("视频添加成功");
          this.$router.push({ path: "/news/video" });
        } else {
          this.$message.warning(res.msg);
        }
        this.sending = false;
      });
    },
    getSelect() {
      this.$axios.get("getChannel", { page: 1 }).then(res => {
        if (res.code == 200) {
          this.category = res.data.channel_list;
        }
      });
    },
    update() {
      this.sending = true;
      let tags = [];
      tags = tags.concat(this.values);
      tags = [...new Set(tags)];
      tags = tags.join(" ");
      let params = {
        id: this.$route.query.id,
        ...this.formData,
        tag: tags
      };
      this.$axios.post("updateNews", params).then(res => {
        if (res.code == 200) {
          this.$message.success("视频编辑成功");
          this.$router.push({ path: "/news/video" });
        } else {
          this.$message.warning(res.msg);
        }
        this.sending = false;
      });
    },
    getOptions() {
      this.$axios.get("getLabel", { parent_id: "0" }).then(res => {
        console.log(res);
        this.options = res.data.label_list;
      });
    },
    getData() {
      this.$axios
        .get("infoNews", { news_id: this.$route.query.id })
        .then(res => {
          this.formData = res.data.news;
          this.playerOptions.poster = res.data.news.title_imgs[0];
          this.playerOptions.sources[0].src = res.data.news.video_url;
          this.fileList.push({
            name: res.data.news.video_url,
            url: res.data.news.video_url
          });
          if (res.data.news.tag) {
            let tags = res.data.news.tag;
            tags = tags.trim().split(" ");
            this.values = tags;
          }
        });
    }
  },
  mounted() {
    this.getSelect();
    this.getOptions();
    if (this.$route.name == "编辑视频") {
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
  padding: 30px 80px 0 90px;
}
.video {
  margin-top: 20px;
}
.first,
.second,
.third,
.fourth {
  padding: 27px 54px 26px 56px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.top {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-bottom: 41px;
}
</style>
