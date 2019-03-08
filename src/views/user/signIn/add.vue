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
          label="抽奖标题"
          prop="luck_draw_title"
        >
          <el-input
            v-model="formData.luck_draw_title"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </div>
      <!-- <div class="second">
        <el-form-item
          label="中奖比例"
          prop="ratio"
          style="width:200px"
        >
          <el-radio
            v-model="formData.luck_draw_type"
            label="1"
          >备选项</el-radio>
          <el-radio
            v-model="formData.luck_draw_type"
            label="2"
          >备选项</el-radio>
        </el-form-item>
      </div> -->
      <div class="third">
        <el-button
          type="primary"
          @click="addChild"
          class="addButton"
          style="margin-bottom:20px"
        >添加规则</el-button>
        <div
          v-for="(item,index) in  formData.prizeDetail"
          :key="index"
          style="display:flex;align-items:center"
        >
          <!-- <el-form :model="item" label-width="100px" label-position="right" ref="imgform"> -->
          <el-form-item
            label="奖励额度"
            :prop="'prizeDetail.' +index+'.reward_quota'"
            :rules="rules.reward"
            style="width:200px;margin-top:20px;margin-right:20px"
          >
            <el-input
              v-model="item.reward_quota"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="中奖概率"
            :prop="'prizeDetail.' +index+'.winning_probability'"
            :rules="rules.ratio"
            style="width:200px;margin-top:20px;margin-right:20px"
          >
            <el-input
              v-model="item.winning_probability"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-button
            @click.prevent="removeChild(item)"
            type="danger"
            size="small"
            class="delButton"
          >删除本条规则</el-button>
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
        <el-form-item label="道具说明">
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
          @click="editForm('formData')"
          v-if="this.id"
        >保存</el-button>
        <el-button
          type="primary"
          v-else
          @click="submitForm('formData')"
        >添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkRatio = (rule, value, callback) => {
      let regExp = /^\d+\.?\d{0,2}%$/;
      if (!value) {
        callback(new Error("请输入中奖概率"));
      }
      if (regExp.test(value) === false) {
        callback(new Error("中奖概率精确到百分数后两位"));
      } else {
        this.total = 0;
        this.formData.prizeDetail.map(item => {
          this.total = Number(
            (
              this.total +
              Number(item.winning_probability.replace("%", "") / 100)
            ).toFixed(4)
          );
        });
        if (this.total == 1) {
          callback();
        } else {
          console.log(this.total);
          callback(new Error("中奖总和为100%"));
        }
      }
    };
    return {
      formData: {
        prizeDetail: [{ reward_quota: "", winning_probability: "" }]
      },
      date: "", //日期
      total: 0,
      id: "",
      rules: {
        luck_draw_title: [
          { required: true, message: "请输入标签", trigger: "blur" }
        ],
        reward: [
          { required: true, message: "请输入奖励额度", trigger: "blur" }
        ],
        ratio: [{ required: true, validator: checkRatio, trigger: "blur" }]
      }
    };
  },
  methods: {
    addChild() {
      let obj = {
        reward_quota: "",
        winning_probability: ""
      };
      this.formData.prizeDetail.unshift({ ...obj });
    },
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
    //添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var prize = JSON.parse(JSON.stringify(this.formData.prizeDetail));
          prize.map(item => {
            item.winning_probability = Number(
              Number(item.winning_probability.replace("%", "") / 100).toFixed(4)
            );
          });
          var data = {
            ...this.formData,
            prizeDetail: prize,
            luck_draw_type: 0
          };
          console.log(data);
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
          var prize = JSON.parse(JSON.stringify(this.formData.prizeDetail));
          var prizeDetail = [];
          prize.map(item => {
            item.winning_probability = Number(
              Number(item.winning_probability.replace("%", "") / 100).toFixed(4)
            );
          });
          var data = {
            ...this.formData,
            prizeDetail: prize
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
    getData() {
      this.$axios.get("getPrize", { luck_draw_type: 0 }).then(res => {
        if (res.code == 200 && res.data) {
          this.id = res.data.prizePlanList[0].id;
          this.$axios
            .get("infoPrize", {
              luck_draw_id: this.id
            })
            .then(reslove => {
              this.formData = reslove.data.prizePlanList[0];
              this.formData.prizeDetail.map(item => {
                item.winning_probability =
                  parseFloat((item.winning_probability * 100).toFixed(2)) + "%";
              });
              this.restoreDate(
                this.formData.luck_draw_start_date,
                this.formData.luck_draw_end_date
              );
            });
        }
      });
    }
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

