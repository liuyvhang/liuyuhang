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
        <el-form-item label="赛事名称">
          <el-input
            v-model="formData.match_name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="游戏">
          <el-select
            v-model="formData.game_id"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in game"
              :key="item.id"
              :label="item.game_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="赛事状态">
          <el-radio
            v-model="formData.match_state"
            :label="0"
          >未开始</el-radio>
          <el-radio
            v-model="formData.match_state"
            :label="1"
          >进行中</el-radio>
          <el-radio
            v-model="formData.match_state"
            :label="2"
          >已结束</el-radio>
        </el-form-item>
        <el-form-item label="赛程时间">
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
        <el-form-item label="赛事描述">
          <el-input
            v-model="formData.match_desc"
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
          v-if="$route.name=='添加赛事'"
        >添加</el-button>
        <el-button
          type="primary"
          @click="editForm('formData')"
          v-if="$route.name=='编辑赛事'"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {},
      game: [],
      date: ""
    };
  },
  methods: {
    //添加
    submitForm(formName) {
      let data = {
        ...this.formData
      };
      console.log(data)
      this.$axios.post("addMatch", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "赛事添加成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/match" });
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
      this.$axios.post("updateMatch", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "赛事编辑成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/match" });
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
    //获得开始时间和结束时间
    changeDate(val) {
      if (val) {
        this.formData.match_start_date = val[0];
        this.formData.match_end_date = val[1];
      }
    },
    //编辑将时间整合
    restoreDate(a, b) {
      this.date = [new Date(a), new Date(b)];
      console.log(this.date);
    },
    //获取数据回填
    getData() {
      this.$axios
        .get("infoMatch", { match_id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.game_match;
            this.restoreDate(
              res.data.game_match.match_start_date,
              res.data.game_match.match_end_date
            );
          }
        });
    },
    getGame() {
      this.$axios.get("getGame", { page: 1 }).then(res => {
        this.game = res.data.game_list;
      });
    }
  },
  mounted() {
    this.getGame();
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

