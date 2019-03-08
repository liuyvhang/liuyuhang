<template>
  <div class="bannerAdd">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
      <div class="first">
        <el-form-item label="活动标题">
          <el-input v-model="formData.activity_title" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="社群">
          <el-select v-model="formData.community_id" placeholder="请选择社群">
            <el-option v-for="item in comOptions" :key="item.id" :label="item.community_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宣传图">
          <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="formData.activity_publicity_pic	" :src="formData.activity_publicity_pic	" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="竞猜时间">
          <el-date-picker v-model="date" size="medium" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @change="changeDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="竞猜总分数">
          <el-input v-model.number="formData.integral_total" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-radio v-model="formData.is_recommend" :label="1">是</el-radio>
          <el-radio v-model="formData.is_recommend" :label="0">否 </el-radio>
        </el-form-item>
        <el-form-item label="置顶">
          <el-radio v-model="formData.is_top" :label="1">是</el-radio>
          <el-radio v-model="formData.is_top" :label="0">否 </el-radio>
        </el-form-item>
        <el-form-item label="有效">
          <el-radio v-model="formData.is_valid" :label="0">是 </el-radio>
          <el-radio v-model="formData.is_valid" :label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="排序值">
          <el-select v-model="formData.sort_val" placeholder="请选择" size="small">
            <el-option v-for="item in options2" :key="item.blockName" :label="item.blockName" :value="item.blockName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动地址">
          <el-input v-model="formData.activity_url" placeholder="请输入链接"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="formData.introduction" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </div>
      <div class="third">
        <el-button type="primary" @click="addChild" class="addButton">添加题目</el-button>
        <div class="fourth" v-for="(item,index) in  formData.guessInfoDetail" :key="index">
          <el-button @click.prevent="removeChild(item)" type="danger" size="small" class="delButton">删除本条题目</el-button>
          <el-form :model="item" label-width="100px" label-position="right">
            <el-form-item label="题目">
              <el-input v-model="item.guess_subject[0]" placeholder="请输入内容" style="width:200px"></el-input>
              VS
              <el-input v-model="item.guess_subject[1]" placeholder="请输入内容" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="竞猜类型">
              <el-radio-group v-model="item.guess_type" @change="selectType(index)">
                <el-radio :label="0">胜负 </el-radio>
                <el-radio :label="1">比分</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="详情" v-if="item.guess_type==0">
              <el-input disabled style="width:60px;margin-right:10px" v-for="(val, idx) in item.guess_detail" :key="idx" v-model="val.item"></el-input>
              <el-button type="primary" @click.prevent="removeDraw(index)" v-if="item.guess_detail.length==3">无平局</el-button>
              <el-button type="primary" @click="resetForm(index)" v-if="item.guess_detail.length==2">有平局</el-button>
            </el-form-item>
            <el-form-item label="详情" v-if="item.guess_type==1">
              <div style="display:flex;flex-wrap: wrap;align-items:baseline;align-content:center;margin-bottom:20px;" v-for="(val, idx) in item.guess_detail" :key="idx">
                <div>{{val.item}}</div>
                <div v-for="(value, idx1) in val.scores" :key="idx1">
                  <el-input style="width:100px;margin-left:10px;margin-bottom:10px; " v-model="value.score"><i slot="suffix" class="el-input__icon el-icon-remove" style="color:red;cursor: pointer;" @click="removeScore(value,index,idx)"></i></el-input>
                </div>
                <el-button style="margin-left:10px" @click="addScore(index,idx)">添加比分</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-form-item>
        <el-button type=" primary" @click="submitForm('formData')" v-if="$route.name=='添加竞猜'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑竞猜'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        activity_publicity_pic: "", //宣传图
        guessInfoDetail: [] //竞猜信息
      },
      date: "", //日期
      rules: {},
      comOptions: [], //社群列表
      options2: [
        //排序值列表
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ]
    };
  },
  methods: {
    //生成uuid
    uuid(len, radix) {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
      var uuid = [],
        i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
          }
        }
      }
      return uuid.join("");
    },
    //添加题目
    addChild() {
      let obj = {
        guess_subject: ["", ""],
        guess_detail: [
          {
            id: this.uuid(16, 16),
            item: "胜",
            scores: [
              { id: this.uuid(16, 16), score: "2:1" },
              { id: this.uuid(16, 16), score: "3:1" },
              { id: this.uuid(16, 16), score: "4:1" },
              { id: this.uuid(16, 16), score: "3:2" },
              { id: this.uuid(16, 16), score: "4:2" },
              { id: this.uuid(16, 16), score: "4:3" },
              { id: this.uuid(16, 16), score: "5:1" },
              { id: this.uuid(16, 16), score: "5:2" },
              { id: this.uuid(16, 16), score: "5:3" },
              { id: this.uuid(16, 16), score: "5:4" }
            ]
          },
          {
            id: this.uuid(16, 16),
            item: "平",
            scores: [
              { id: this.uuid(16, 16), score: "0:0" },
              { id: this.uuid(16, 16), score: "1:1" },
              { id: this.uuid(16, 16), score: "2:2" },
              { id: this.uuid(16, 16), score: "3:3" },
              { id: this.uuid(16, 16), score: "4:4" }
            ]
          },
          {
            id: this.uuid(16, 16),
            item: "负",
            scores: [
              { id: this.uuid(16, 16), score: "1:2" },
              { id: this.uuid(16, 16), score: "1:3" },
              { id: this.uuid(16, 16), score: "1:4" },
              { id: this.uuid(16, 16), score: "1:5" },
              { id: this.uuid(16, 16), score: "2:3" },
              { id: this.uuid(16, 16), score: "3:4" },
              { id: this.uuid(16, 16), score: "3:5" },
              { id: this.uuid(16, 16), score: "4:5" },
              { id: this.uuid(16, 16), score: "1:6" },
              { id: this.uuid(16, 16), score: "2:6" },
              { id: this.uuid(16, 16), score: "3:6" },
              { id: this.uuid(16, 16), score: "4:6" },
              { id: this.uuid(16, 16), score: "5:6" }
            ]
          }
        ]
      };
      this.formData.guessInfoDetail.unshift(obj);
    },
    //添加比分
    addScore(index, idx) {
      console.log(index, idx);
      let obj = { id: this.uuid(16, 16), score: "" };
      this.formData.guessInfoDetail[index].guess_detail[idx].scores.push(obj);
    },
    //删除题目
    removeChild(item) {
      var index = this.formData.guessInfoDetail.indexOf(item);
      if (index !== -1) {
        this.formData.guessInfoDetail.splice(index, 1);
      }
    },
    removeScore(value, index, idx) {
      var currentIndex = this.formData.guessInfoDetail[index].guess_detail[
        idx
      ].scores.indexOf(value);
      if (currentIndex !== -1) {
        this.formData.guessInfoDetail[index].guess_detail[idx].scores.splice(
          currentIndex,
          1
        );
      }
    },
    //胜负状态下无平局
    removeDraw(index) {
      this.formData.guessInfoDetail[index].guess_detail = [
        { id: this.uuid(16, 16), item: "胜" },
        { id: this.uuid(16, 16), item: "负" }
      ];
    },
    //胜负状态下有平局
    resetForm(index) {
      this.formData.guessInfoDetail[index].guess_detail = [
        { id: this.uuid(16, 16), item: "胜" },
        { id: this.uuid(16, 16), item: "平" },
        { id: this.uuid(16, 16), item: "负" }
      ];
    },
    //切换选项是重置数据
    selectType(index) {
      this.formData.guessInfoDetail[index].guess_detail = [
        {
          id: this.uuid(16, 16),
          item: "胜",
          scores: [
            { id: this.uuid(16, 16), score: "2:1" },
            { id: this.uuid(16, 16), score: "3:1" },
            { id: this.uuid(16, 16), score: "4:1" },
            { id: this.uuid(16, 16), score: "3:2" },
            { id: this.uuid(16, 16), score: "4:2" },
            { id: this.uuid(16, 16), score: "4:3" },
            { id: this.uuid(16, 16), score: "5:1" },
            { id: this.uuid(16, 16), score: "5:2" },
            { id: this.uuid(16, 16), score: "5:3" },
            { id: this.uuid(16, 16), score: "5:4" }
          ]
        },
        {
          id: this.uuid(16, 16),
          item: "平",
          scores: [
            { id: this.uuid(16, 16), score: "0:0" },
            { id: this.uuid(16, 16), score: "1:1" },
            { id: this.uuid(16, 16), score: "2:2" },
            { id: this.uuid(16, 16), score: "3:3" },
            { id: this.uuid(16, 16), score: "4:4" }
          ]
        },
        {
          id: this.uuid(16, 16),
          item: "负",
          scores: [
            { id: this.uuid(16, 16), score: "1:2" },
            { id: this.uuid(16, 16), score: "1:3" },
            { id: this.uuid(16, 16), score: "1:4" },
            { id: this.uuid(16, 16), score: "1:5" },
            { id: this.uuid(16, 16), score: "2:3" },
            { id: this.uuid(16, 16), score: "3:4" },
            { id: this.uuid(16, 16), score: "3:5" },
            { id: this.uuid(16, 16), score: "4:5" },
            { id: this.uuid(16, 16), score: "1:6" },
            { id: this.uuid(16, 16), score: "2:6" },
            { id: this.uuid(16, 16), score: "3:6" },
            { id: this.uuid(16, 16), score: "4:6" },
            { id: this.uuid(16, 16), score: "5:6" }
          ]
        }
      ];
    },
    //获得开始时间和结束时间
    changeDate(val) {
      if (val) {
        this.formData.guess_start_date = val[0];
        this.formData.guess_end_date = val[1];
      }
    },
    //编辑将时间整合
    restoreDate(a, b) {
      this.date = [new Date(a), new Date(b)];
      console.log(this.date);
    },
    //上传图片地址
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      this.formData.activity_publicity_pic = res.data.upload.url;
      console.log(this.formData);
    },
    //上传前的验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.common.errorTip("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      if (!isLt2M) {
        this.common.errorTip("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = JSON.parse(JSON.stringify(this.formData.guessInfoDetail));
          arr.map(item => {
            item.guess_subject = item.guess_subject.toString();
          });
          console.log(arr);
          let data = {
            ...this.formData,
            guessInfoDetail: arr,
            guess_is_vaild: 0,
            activity_type: 0,
            guess_is_settlement: 0, //0是未结算1是结算，
            founder_user_id: "30be03b3acf543a3844ff4201c8155ae",
            guess_name: this.formData.activity_title
          };
          console.log(data);
          this.$axios.post("addGuess", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "竞猜添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/group/guess" });
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
    //保存更改
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = JSON.parse(JSON.stringify(this.formData.guessInfoDetail));
          arr.map(item => {
            item.guess_subject = item.guess_subject.toString();
          });
          console.log(arr);
          let data = {
            ...this.formData,
            guessInfoDetail: arr,
            guess_is_vaild: 0,
            guess_name: this.formData.activity_title
          };
          console.log(data);
          this.$axios.post("updateGuess", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "竞猜编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/group/guess" });
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
    //获取详情
    getData() {
      this.$axios.get("infoGuess", { id: this.$route.query.id }).then(res => {
        this.formData = res.data.activityInfoDetail;
        this.formData.guessInfoDetail.map(item => {
          item.guess_subject = item.guess_subject.split(",");
        });
        this.restoreDate(
          res.data.activityInfoDetail.guess_start_date,
          res.data.activityInfoDetail.guess_end_date
        );
      });
    },
    //获取社群列表
    getGroup() {
      this.$axios.get("getGroup").then(res => {
        if (res.code == 200) {
          this.comOptions = res.data.backAssociationList;
        }
      });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getData();
    }
    this.getGroup();
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

