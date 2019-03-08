<template>
  <div class="container">
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
        <el-form-item
          label="比赛描述"
          prop="match_desc"
        >
          <el-input
            v-model="formData.match_desc"
            placeholder="请输入比赛描述"
          ></el-input>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item label="频道">
          <el-select
            v-model="formData.channel_id"
            filterable
            clearable
            placeholder="请添加标签"
          >
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.channel_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio
            v-model="formData.match_status"
            :label="0"
          >未开始</el-radio>
          <el-radio
            v-model="formData.match_status"
            :label="1"
          >直播中</el-radio>
          <el-radio
            v-model="formData.match_status"
            :label="2"
          >已结束</el-radio>
          <el-radio
            v-model="formData.match_status"
            :label="3"
          >延期</el-radio>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item label="主队">
          <el-select
            v-model="formData.left_name"
            filterable
            clearable
            placeholder="请选择球队"
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
        <el-form-item label="主队LOGO">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgUrl()"
            :show-file-list="false"
            :on-success="handleLeftSuccess"
          >
            <img
              v-if="formData.left_badge"
              :src="formData.left_badge"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="客队">
          <el-select
            v-model="formData.right_name"
            filterable
            clearable
            @change="changeRight"
            placeholder="请选择球队"
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
        <el-form-item label="客队LOGO">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgUrl()"
            :show-file-list="false"
            :on-success="handleRightSuccess"
          >
            <img
              v-if="formData.right_badge"
              :src="formData.right_badge"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="date"
            size="medium"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择开始时间"
            @change="changeDate"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="fourth">

      </div>
      <div class="third">
        <el-form-item label="直播源名称">
          <el-input
            v-model="formData.source_name"
            placeholder="请输入直播源名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="直播源类型">
          <el-radio
            v-model="formData.source_type"
            :label="0"
          >m3u8</el-radio>
          <el-radio
            v-model="formData.source_type"
            :label="1"
          >flv</el-radio>
        </el-form-item>
        <el-form-item
          label="直播链接"
          prop="source_url"
        >
          <el-input
            v-model="formData.source_url"
            placeholder="请输入直播链接"
          ></el-input>
        </el-form-item>
        <el-form-item label="直播简介">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="formData.source_desc"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item
          label="赛况链接"
          prop="matchUrl"
        >
          <el-input
            v-model="formData.matchUrl"
            placeholder="请输入赛况链接"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="阵容链接"
          prop="arrayUrl"
        >
          <el-input
            v-model="formData.arrayUrl"
            placeholder="请输入阵容链接"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="数据链接"
          prop="dataUrl"
        >
          <el-input
            v-model="formData.dataUrl"
            placeholder="请输入数据链接"
          ></el-input>
        </el-form-item> -->
      </div>
      <div class="third">
        <el-form-item
          label="权重"
          prop="weight"
        >
          <el-select
            v-model="formData.weight"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in options1"
              :key="item.blockName"
              :label="item.blockName"
              :value="item.blockName"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          :loading="sending"
          v-if="this.$route.name=='新增赛事直播'"
          @click="submitForm('formData')"
        >添加</el-button>
        <el-button
          type="primary"
          :loading="sending"
          @click="editForm('formData')"
          v-else
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        left_badge: "",
        right_badge: "",
        left_name: "",
        right_name: "",
        channel_id: "",
        start_date: "",
        match_status: 0,
        source_type: 0
      },
      date: "",
      options: [],
      options1: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ],
      options2: [],
      left: [],
      right: [],
      total: 0,
      sending: false,
      rules: {
        match_desc: [
          { required: true, message: "请输入标签", trigger: "blur" }
        ],
        source_url: [
          { required: true, message: "请输入直播链接", trigger: "blur" }
        ],
        matchUrl: [
          { required: true, message: "请输入赛况链接", trigger: "blur" }
        ],
        arrayUrl: [
          { required: true, message: "请输入阵容链接", trigger: "blur" }
        ],
        dataUrl: [
          { required: true, message: "请输入数据链接", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //获得开始时间和结束时间
    changeDate(val) {
      console.log(val);
      if (val) {
        this.formData.start_date = val;
      }
    },
    changeLeft(val) {
      if (val) {
        if (this.formData.left_name == this.formData.right_name) {
          this.$message.warning("请不要重复选择球队");
          this.formData.left_name = "";
        }
      }
    },
    changeRight(val) {
      if (val) {
        if (this.formData.left_name == this.formData.right_name) {
          this.$message.warning("请不要重复选择球队");
          this.formData.right_name = "";
        }
      }
    },
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    handleLeftSuccess(res, file) {
      this.formData.left_badge = res.data.upload.url;
    },
    handleRightSuccess(res, file) {
      this.formData.right_badge = res.data.upload.url;
    },
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options;
      };
    },
    //添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sending = true;
          var data = {
            ...this.formData
          };
          console.log(data);
          this.$axios.post("addLive", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "赛事直播添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/video/video" });
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
              this.sending = true;
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
          this.sending = true;
          var data = {
            ...this.formData
          };
          console.log(data);
          this.$axios.post("updateLive", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "赛事直播编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/video/video" });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
          this.sending = false;
          console.log("error edit!!");
          return false;
        }
      });
    },
    getData() {
      this.$axios
        .get("infoLive", { match_id: this.$route.query.id })
        .then(res => {
          this.formData = res.data.match;
          this.date = new Date(res.data.match.start_date);
        });
    },
    //获取数据回填
    getOptions() {
      this.$axios.get("getLabel", { parent_id: "0" }).then(res => {
        this.options = res.data.label_list;
      });
    },
    getOptions1() {
      this.$axios.get("getChannel", { page: 1 }).then(res => {
        if (res.code == 200) {
          this.options2 = res.data.channel_list;
        }
      });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData();
    }
    this.getOptions();
    this.getOptions1();
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
  width: 100px;
  height: 100px;
  line-height: 100px !important;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

 <style scoped>
.container {
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
</style>

