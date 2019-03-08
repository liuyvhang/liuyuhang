<template>
  <div class="bannerAdd">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <div class="first">
        <el-form-item label="广告名称">
          <el-input
            v-model="formData.advertisement_name"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio
            v-model="formData.state"
            :label="0"
          >有效 </el-radio>
          <el-radio
            v-model="formData.state"
            :label="1"
          >无效</el-radio>
        </el-form-item>
        <el-form-item label="广告位">
          <el-select
            v-model="formData.position_name"
            placeholder="请选择"
            size="small"
            @change="handOut"
          >
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.position_name"
              :value="[item.id,item.position_code]"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="third">
        <el-button
          type="primary"
          @click="addChild"
          class="addButton"
        >添加广告</el-button>
        <div
          class="fourth"
          v-for="(item,index) in  formData.ad_detail_list"
          :key="index"
        >
          <el-button
            @click.prevent="removeChild(item)"
            type="danger"
            size="small"
            class="delButton"
          >删除本条广告</el-button>
          <!-- <el-form :model="item" label-width="100px" label-position="right" ref="imgform"> -->
          <el-form-item label="标题">
            <el-input
              v-model="item.title"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="媒体类型"
            :prop="'ad_detail_list.' + index +'.media_type'"
            :rules="rules.media_type"
          >
            <el-radio
              v-model="item.media_type"
              :label="0"
            >图片</el-radio>
            <el-radio
              v-model="item.media_type"
              :label="1"
            >视频</el-radio>
            <el-radio
              v-model="item.media_type"
              :label="2"
            >文本</el-radio>
          </el-form-item>
          <el-form-item
            label="跳转类型"
            :prop="'ad_detail_list.' + index +'.forward_type'"
            :rules="rules.forward_type"
          >
            <el-select
              v-model="item.forward_type"
              placeholder="请选择类型"
            >
              <el-option
                v-for="val in options3"
                :key="val.forward_name"
                :label="val.forward_name"
                :value="val.forward_type"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="跳转链接"
            :prop="'ad_detail_list.' +index+'.target_identification'"
            :rules="rules.target_identification"
          >
            <el-input
              v-model="item.target_identification"
              placeholder="请输入ID/链接"
            ></el-input>
          </el-form-item>
          <el-form-item label="广告图片">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgUrl()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              @click.native="getIndex(index)"
            >
              <img
                v-if="item.original_pic"
                :src="item.original_pic"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item
            v-if="formData.ad_detail_list[index].media_type===0&&formData.position_code=='B1'"
            label="小程序图片"
          >
            <el-upload
              class="avatar-uploader"
              :action="uploadImgUrl()"
              :show-file-list="false"
              :on-success="handleMiniSuccess"
              @click.native="getIndex(index)"
            >
              <img
                v-if="item.medium_pic"
                :src="item.medium_pic"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="视频上传"
            v-if="formData.ad_detail_list[index].media_type===1&&formData.position_code=='B1'"
          >
            <!-- <upload @uploadSuccess="upSuccess" @getPercent="getPercent" :isButton="true"></upload> -->
            <el-upload
              class="upload-demo"
              :action="uploadVideo()"
              @click.native="getIndex(index)"
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
              v-if="playerOptions.sources[index].src"
            ></videoPlayer>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="item.date"
              size="small"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate(index)"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="排序值">
            <el-select
              v-model="item.sort_val"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="val in options2"
                :key="val.blockName"
                :label="val.blockName"
                :value="val.blockName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input
              v-model="item.summary"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <!-- </el-form> -->
        </div>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('formData')"
          v-if="$route.name=='添加广告'"
        >添加</el-button>
        <el-button
          type="primary"
          @click="editForm('formData')"
          v-if="$route.name=='编辑广告'"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      formData: {
        ad_detail_list: []
      },
      rules: {},
      options: [],
      position_name: [],
      options1: [
        { id: 1, position_name: "资讯", position_code: 100 },
        { id: 2, position_name: "活动", position_code: 200 }
      ],
      options2: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ],
      options3: [
        { forward_name: "资讯", forward_type: 0 },
        { forward_name: "社群首页", forward_type: 1 },
        { forward_name: "帖子", forward_type: 2 },
        { forward_name: "问答", forward_type: 3 },
        { forward_name: "活动", forward_type: 4 },
        { forward_name: "H5页面", forward_type: 5 },
        { forward_name: "京东", forward_type: 6 },
        { forward_name: "天猫", forward_type: 7 }
      ],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        classify: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        title_image: [
          { required: true, message: "请上传图片", trigger: "change" }
        ],
        forward_type: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        target_identification: [
          { required: true, message: "请添加ID/链接", trigger: "blur" }
        ],
        media_type: [
          { required: true, message: "请选择媒体类型", trigger: "change" }
        ]
      },
      fileList: [],
      playerOptions: {
        language: "zh-CN",
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
        ],
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        poster: "", //视频头图地址
        preload: "auto",
        aspectRatio: "16:9"
      }
    };
  },
  methods: {
    //上传图片地址
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    //上传视频地址
    uploadVideo() {
      return `${process.env.BASE_API}systemApiService/upload/file`;
    },
    //视频上传成功
    upSuccess(res, file) {
      console.log(res);
      this.formData.ad_detail_list[this.index].medium_pic = res.data.upload.url;
      this.playerOptions.sources[this.index].src = res.data.upload.url;
    },
    handleRemove() {
      this.playerOptions.sources[this.index].src = "";
      this.formData.ad_detail_list[this.index].medium_pic = "";
    },
    handleExceed(files, fileList) {
      this.$message.warning("最多上传一个文件");
    },
    //添加广告
    addChild() {
      let obj = {
        title: "",
        forward_type: "",
        target_identification: "",
        original_pic: "", //没有图片不显示
        medium_pic: "", //没有图片/视频不显示
        sort_val: "",
        summary: "",
        media_type: "",
        date: "",
        start_date: "",
        end_date: ""
      };
      this.formData.ad_detail_list.unshift({ ...obj });
      this.playerOptions.sources.unshift({ type: "video/mp4", src: "" });
    },
    //删除广告
    removeChild(item) {
      var index = this.formData.ad_detail_list.indexOf(item);
      if (index !== -1) {
        this.formData.ad_detail_list.splice(index, 1);
        this.playerOptions.sources.splice(index, 1);
      }
    },
    //获取当前广告索引
    getIndex(index) {
      this.index = index;
    },
    //分发时间
    changeDate(index) {
      if (this.formData.ad_detail_list[index].date) {
        this.formData.ad_detail_list[
          index
        ].start_date = this.formData.ad_detail_list[index].date[0];
        this.formData.ad_detail_list[
          index
        ].end_date = this.formData.ad_detail_list[index].date[1];
      }
    },
    //重置时间
    restoreDate(a, b, index) {
      var date = [new Date(a), new Date(b)];
      this.$set(this.formData.ad_detail_list[index], "date", date);
      // this.formData.ad_detail_list[index].date = date;
    },
    //分发广告位
    handOut(val) {
      this.formData.position_id = val[0];
      this.formData.position_code = val[1];
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      this.formData.ad_detail_list[this.index].original_pic =
        res.data.upload.url;
    },
    //小程序图片上传成功
    handleMiniSuccess(res, file) {
      this.formData.ad_detail_list[this.index].medium_pic = res.data.upload.url;
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formData.ad_detail_list.map(item => {
            delete item.date;
          });
          let data = {
            ...this.formData,
            position_name: "",
            advertisement_type: 0 //轮播类型
          };
          console.log(data);
          this.$axios.post("addAd", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "广告添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/news/ad" });
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
              console.log("error submit!!");
              return false;
            }
          });
        }
      });
    },
    //保存
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formData.ad_detail_list.map(item => {
            delete item.date;
          });
          let data = {
            ...this.formData,
            position_name: "",
            advertisement_type: 0, //轮播类型
            id: this.$route.query.id
          };
          console.log(data);
          this.$axios.post("updateAd", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "广告编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/news/ad" });
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
              console.log("error edit!!");
              return false;
            }
          });
        }
      });
    },
    //获取数据
    getData() {
      this.$axios
        .get("infoAd", { advertisement_id: this.$route.query.id })
        .then(res => {
          this.formData = res.data.advertisement;
          this.formData.ad_detail_list.map((item, index) => {
            this.restoreDate(item.start_date, item.end_date, index);
            if (this.formData.position_code == "B1" && item.media_type === 1) {
              this.playerOptions.sources[index] = {
                type: "video/mp4",
                src: item.medium_pic
              };
            }
          });
        });
    },
    //获取广告位
    getPosition() {
      this.$axios.get("getPosition", { page: 1 }).then(res => {
        if (res.code == 200) {
          this.options1 = res.data.ad_position_list;
        }
      });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData();
    }
    this.getPosition();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px !important;
  text-align: center;
}

.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
.bannerAdd .form-control {
  clear: none !important;
}
</style>

 <style scoped>
.bannerAdd {
  padding: 30px 80px 0 90px;
}
.top {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-bottom: 41px;
}
.first,
.second,
.third,
.fourth {
  padding: 27px 54px 26px 56px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.addButton,
.delButton {
  margin-bottom: 20px;
}
</style>

