
      <template>
  <div class="newsAdAdd">
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
        <el-form-item label="标题">
          <el-input
            v-model="formData.title"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgUrl()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="formData.original_pic"
              :src="formData.original_pic"
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
        <el-form-item label="频道">
          <el-select
            v-model="values"
            placeholder="请选择"
            size="small"
            multiple
            @change="change"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.channel_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="媒体类型">
          <el-radio
            v-model="formData.media_type"
            :label="0"
          >图片</el-radio>
          <el-radio
            v-model="formData.media_type"
            :label="1"
          >视频</el-radio>
          <el-radio
            v-model="formData.media_type"
            :label="2"
          >文本</el-radio>
        </el-form-item>
        <el-form-item label="展示形式">
          <el-radio
            v-model="formData.advertisement_style"
            :label="0"
          >图文</el-radio>
          <el-radio
            v-model="formData.advertisement_style"
            :label="1"
          >浮窗</el-radio>
          <el-radio
            v-model="formData.advertisement_style"
            :label="2"
          >单图</el-radio>
        </el-form-item>
        <el-form-item
          label="跳转类型"
          prop="forward_type"
          :rules="rules.forward_type"
        >
          <el-select
            v-model="formData.forward_type"
            placeholder="请选择类型"
          >
            <el-option
              v-for="item in options3"
              :key="item.forward_name"
              :label="item.forward_name"
              :value="item.forward_type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="跳转链接"
          prop="target_identification"
          :rules="rules.target_identification"
        >
          <el-input
            v-model="formData.target_identification"
            placeholder="请输入ID/链接"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="展示位置"
          prop="display_position'"
          :rules="[{ type: 'number', message: '展示位置必须为数字值'}]"
        >
          <el-input
            v-model.number="formData.display_position"
            placeholder=" 请输入位置"
          ></el-input>
        </el-form-item>
      </div>
      <div class="third">
        <el-form-item label="时间">
          <el-date-picker
            v-model="date"
            size="small"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="排序值">
          <el-select
            v-model="formData.sort_val"
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
        <el-form-item label="摘要">
          <el-input
            v-model="formData.summary"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('formData')"
          v-if="$route.name=='添加资讯广告'"
        >添加</el-button>
        <el-button
          type="primary"
          @click="editForm('formData')"
          v-if="$route.name=='编辑资讯广告'"
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
        original_pic: ""
      },
      options: [],
      date: "",
      values: "",
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
        ]
      }
    };
  },
  methods: {
    change(val) {
      console.log(val);
      console.log(this.values);
    },
    changeDate(val) {
      if (val) {
        this.formData.start_date = val[0];
        this.formData.end_date = val[1];
      }
    },
    restoreDate(a, b) {
      this.date = [new Date(a), new Date(b)];
      console.log(this.date);
    },
    handleAvatarSuccess(res, file) {
      this.formData.original_pic = res.data.upload.url;
    },
    beforeAvatarUpload(file) {},
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let tags = [];
          tags = tags.concat(this.values);
          tags = [...new Set(tags)];
          tags = tags.toString();
          let data = {
            ...this.formData,
            advertisement_type: 0, //轮播类型
            channel_id: tags
          };
          console.log(data);
          this.$axios.post("addAdNews", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "资讯广告添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/news/adNews" });
            }
          });
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
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let tags = [];
          tags = tags.concat(this.values);
          tags = [...new Set(tags)];
          tags = tags.toString();
          let data = {
            ...this.formData,
            channel_id: tags,
            id: this.$route.query.id
          };
          console.log(data);
          this.$axios.post("updateAdNews", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "资讯广告编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/news/adNews" });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
          console.log("error edit!!");
          return false;
        }
      });
    },
    getData() {
      this.$axios
        .get("infoAdNews", { ad_detail_id: this.$route.query.id })
        .then(res => {
          this.formData = res.data.ad_detail;
          if (res.data.ad_detail.channel_id) {
            let tags = res.data.ad_detail.channel_id;
            tags = tags.trim().split(",");
            this.values = tags;
          }
          console.log(this.values);
          this.restoreDate(
            res.data.ad_detail.start_date,
            res.data.ad_detail.end_date
          );
        });
    },
    getSport() {
      this.$axios.get("getChannel", { page: 1 }).then(res => {
        if (res.code == 200) {
          this.options = res.data.channel_list;
        }
      });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData();
    }
    this.getSport();
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

