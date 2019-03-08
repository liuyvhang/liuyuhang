<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <div class="first">
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="formData.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="资讯图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgUrl()"
            multiple
            :on-exceed="handleExceed"
            :file-list="formData.title_imgs"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            :limit="3"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="third">
        <el-button
          type="primary"
          size="small"
          @click="addChild"
          class="addButton"
          style="margin-bottom:20px"
        >添加邀请奖励</el-button>
        <div
          v-for="(item,index) in  formData.prizeDetail"
          :key="index"
          style="display:flex;align-items:center"
        >
          <!-- <el-form :model="item" label-width="100px" label-position="right" ref="imgform"> -->
          <el-form-item
            label="人数"
            :prop="'prizeDetail.' +index+'.people_num'"
            :rules="rules.people"
            style="width:250px;margin-top:20px;margin-right:20px"
          >
            <el-input
              v-model="item.people_num"
              placeholder="请输入邀请人数"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="奖金"
            :prop="'prizeDetail.' +index+'.money'"
            :rules="rules.money"
            style="width:250px;margin-top:20px;margin-right:20px"
          >
            <el-input
              v-model="item.money"
              placeholder="请输入奖励金额"
            ></el-input>
          </el-form-item>
          <el-button
            @click.prevent="removeChild(item)"
            type="danger"
            size="small"
            class="delButton"
          >删除本条奖励</el-button>
          <!-- </el-form> -->
        </div>
      </div>
      <div class="third">
        <el-form-item label="生效时间">
          <el-date-picker
            v-model="date"
            size="medium"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="changeDate"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="fourth">
        <el-form-item label="活动说明">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
            placeholder="请输入内容"
            v-model="formData.remark"
          >
          </el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          v-if="this.$route.name=='添加邀请活动'"
          @click="submitForm('formData')"
        >添加</el-button>
        <el-button
          type="primary"
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
        prizeDetail: [{ people_num: "", money: "" }]
      },
      date: "", //日期
      total: 0,
      id: "",
      rules: {
        title: [{ required: true, message: "请输入标签", trigger: "blur" }],
        money: [{ required: true, message: "请输入奖励金额", trigger: "blur" }],
        people: [{ required: true, message: "请输入邀请人数", trigger: "blur" }]
      }
    };
  },
  methods: {
    //添加规则
    addChild() {
      let obj = {
        people_num: "",
        money: ""
      };
      this.formData.prizeDetail.unshift({ ...obj });
    },
    // 删除规则
    removeChild(item) {
      var index = this.formData.prizeDetail.indexOf(item);
      if (index !== -1) {
        this.formData.prizeDetail.splice(index, 1);
      }
    },
    //获得开始时间和结束时间
    changeDate(val) {
      if (val) {
        this.formData.luck_draw_start_date = val[0];
        this.formData.luck_draw_end_date = val[1];
      }
    },
    //编辑将时间整合
    restoreDate(a, b) {
      this.date = [new Date(a), new Date(b)];
      console.log(this.date);
    },
    handleAvatarSuccess(res, file) {
      let data = {
        name: `${file.name}`,
        url: res.data.upload.url
      };
      this.formData.title_imgs.push(data);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "img/jpeg";
      // const isGIF = file.type === "img/gif";
      // const isPNG = file.type === "img/png";
      // const isBMP = file.type === "img/bmp";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG && !isGIF && !isPNG && !isBMP) {
      //   this.common.errorTip("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      // }
      // if (!isLt2M) {
      //   this.common.errorTip("上传图片大小不能超过 2MB!");
      // }
      // return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    handleRemove(file, fileList) {
      this.formData.title_imgs = fileList;
    },

    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 3 个文件`);
    },
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    //添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            ...this.formData,
            luck_draw_type: 0
          };
          console.log(data);
          debugger;
          this.$axios.post("addPrize", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "签到抽奖添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/user/signIn" });
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
          var data = {
            ...this.formData
          };
          this.$axios.post("updatePrize", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "签到抽奖编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/user/signIn" });
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
    //获取数据回填
    getData() {}
  },
  created() {
    this.getData();
  }
};
</script>
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

