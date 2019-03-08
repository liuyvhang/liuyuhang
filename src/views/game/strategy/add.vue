<template>
    <div>{{$route.name}}</div>
</template>
<template>
    <div class="container">
        <div class="top">
            <span>{{$route.name}}</span>
        </div>
        <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
            <div class="first">
                <el-form-item label="游戏">
                    <el-select v-model="formData.game_id" placeholder="请选择" size="small">
                        <el-option v-for="item in game" :key="item.id" :label="item.game_name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="second">
                <el-form-item label="状态">
                    <el-radio v-model="formData.is_valid" :label="0">有效</el-radio>
                    <el-radio v-model="formData.is_valid" :label="1">无效</el-radio>
                </el-form-item>
                <el-form-item label="难度级别">
                    <el-select v-model="formData.sort_val" placeholder="请选择" size="small">
                        <el-option v-for="item in level" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="third">
                <el-form-item label="攻略类型">
                    <el-select v-model="formData.strategy_type" placeholder="请选择" size="small">
                        <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="攻略">
                    <search :type="formData.strategy_type"></search>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加攻略'">添加</el-button>
                <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑攻略'">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import search from "./components/search";
export default {
  components: {
    search
  },
  data() {
    return {
      formData: {},
      rules: {},
      game: [], //游戏列表
      level: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 }
      ],
      type: [
        {
          value: 0,
          label: "帖子"
        },
        {
          value: 1,
          label: "问答"
        },
        {
          value: 2,
          label: "活动"
        },
        {
          value: 3,
          label: "资讯"
        }
      ]
    };
  },
  methods: {
    //添加
    submitForm(formName) {
      let data = {
        ...this.formData
      };
      this.$axios.post("addConfig", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "配置添加成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/config" });
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
      this.$axios.post("updateConfig", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "配置编辑成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/config" });
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
        .get("infoConfig", { game_conf_id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.game_conf;
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
.second,
.third {
  padding: 27px 54px 26px 56px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
</style>

