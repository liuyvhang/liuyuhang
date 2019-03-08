<template>
  <div>{{$route.name}}</div>
</template>
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
        <el-form-item label="奖励名称">
          <el-input
            v-model="formData.reward_name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="赛事"
          prop="match_id"
        >
          <el-select
            v-model="formData.match_id"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in matchList"
              :key="item.id"
              :label="item.match_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item
          label="排名"
          prop="ranking"
        >
          <el-input
            v-model="formData.ranking"
            placeholder="请输入排名"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="奖励类型">
          <el-radio
            v-model="formData.reward_type"
            :label="0"
          >积分</el-radio>
          <el-radio
            v-model="formData.reward_type"
            :label="1"
          >虚拟物品</el-radio>
          <el-radio
            v-model="formData.reward_type"
            :label="2"
          >实物</el-radio>
        </el-form-item>
        <el-form-item
          label="产品ID"
          v-if="formData.reward_type==2"
        >
          <!-- <el-select
            v-model="formData.product_id"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.item_name"
              :value="item.id"
            >
            </el-option>
          </el-select> -->
          <v-selectpage
            class="form-control"
            :data="productList"
            show-field="item_name"
            v-model="formData.product_id"
            placeholder="请选择产品"
            style="width:350px"
          >
          </v-selectpage>
        </el-form-item>
        <el-form-item label="奖励数目">
          <el-input-number
            v-model="num"
            @change="handleChange"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="奖励描述">
          <el-input
            v-model="formData.reward_desc"
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
          v-if="$route.name=='添加赛事奖励'"
        >添加</el-button>
        <el-button
          type="primary"
          @click="editForm('formData')"
          v-if="$route.name=='编辑赛事奖励'"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    var checkRank = (rule, value, callback) => {
      let regExp = /^[0-9]{1,}[,]?[0-9]{1,}$|^[0-9]{1,}$/;
      if (!value) {
        return callback(new Error("排名不能为空"));
      }
      if (regExp.test(value) === false) {
        callback(new Error(`请输入整数,区域排名请用${'","'}分割`));
      } else {
        let arr = value.split(",");
        if (arr.length === 2) {
          if (eval(arr[0]) > eval(arr[1])) {
            callback(new Error("请输入正确的区域排名"));
          } else {
            callback();
          }
        }
        callback();
      }
    };
    return {
      formData: { reward_num: 1 },
      rules: {
        ranking: [{ required: true, validator: checkRank, trigger: "blur" }],
        match_id: [{ required: true, message: "请选择赛事", trigger: "change" }]
      },
      matchList: [],
      productList: [],
      date: "",
      num: 1
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
      this.formData.reward_num = val;
    },
    //添加
    submitForm(formName) {
      let data = {
        ...this.formData
      };
      console.log(data);
      this.$axios.post("addAward", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "赛事奖励添加成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/award" });
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
    //保存
    editForm(formName) {
      let data = {
        ...this.formData
      };
      console.log(data);
      this.$axios.post("updateAward", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "赛事奖励编辑成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/award" });
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
      this.$axios
        .get("infoAward", { reward_id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.game_reward;
            this.num = res.data.game_reward.reward_num;
          }
        });
    },
    //获取赛事信息
    getMatch() {
      this.$axios.get("getMatch", { page: 0 }).then(res => {
        if (res.code == 200 && res.data)
          this.matchList = res.data.game_match_list;
      });
    },
    //获取产品列表
    getProduct() {
      this.$axios
        .postApp("getProduct", {
          page: 1,
          pType: 1,
          iType: 2
        })
        .then(res => {
          if (res.code == 200 && res.data) {
            this.productList = res.data.list;
          }
        });
    }
  },
  mounted() {
    this.getMatch();
    this.getProduct();
    if (this.$route.query.id) {
      this.getData();
    }
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
.second {
  padding: 27px 54px 26px 56px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
</style>

