<template>
  <div class="container">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
      <!-- <el-form-item label="标签名称" prop="label_name">
                <el-input v-model="formData.label_name" placeholder="请输入内容"></el-input>
            </el-form-item> -->
      <!-- <el-form-item label="标签名称" prop="label_name">
                <el-autocomplete v-model="formData.label_name" :fetch-suggestions="querySearchAsync" @select="handleSelect" placeholder="请输入并选择标签">
                </el-autocomplete>
            </el-form-item> -->
      <el-form-item label="标签名称" prop="label">
        <v-selectpage v-model="formData.label" :data="options" key-field="label" show-field="label" class="form-control" style="width:200px;">
        </v-selectpage>
      </el-form-item>
      <el-form-item label="热度值" prop="hot_val">
        <el-select v-model="formData.hot_val" placeholder="请选择" size="small">
          <el-option v-for="item in options3" :key="item.blockName" :label="item.blockName" :value="item.blockName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加热搜'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑热搜'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {
        label: [{ required: true, message: "请输入标签", trigger: "blur" }]
      },
      options: [],
      options3: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ]
    };
  },
  methods: {
    //添加
    submitForm(formName) {
      console.log(this.$refs.formData);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            hot_val: this.formData.hot_val,
            label_name: this.formData.label
          };
          console.log(data);
          this.$axios.post("addHot", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "热搜添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/tags/hot" });
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
          let data = {
            hot_val: this.formData.hot_val,
            id: this.formData.id,
            label_name: this.formData.label
          };
          console.log(data);
          this.$axios.post("updateHot", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "热搜编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/tags/hot" });
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
      this.$axios
        .get("infoHot", { hot_search_id: this.$route.query.id })
        .then(res => {
          let data = res.data.hot_search;
          this.formData = {
            hot_val: data.hot_val,
            id: data.id,
            label: data.label_name
          };
        });
    },
    getOptions() {
      this.$axios.get("getLabel", { parent_id: "0" }).then(res => {
        console.log(res);
        this.options = res.data.label_list;
      });
    }
    // 选中
    // handleSelect(item) {
    //   console.log(item);
    //   //do something
    // },
    //请求标签
    //queryString 为在框中输入的值
    //callback 回调函数,将处理好的数据推回
    // querySearchAsync(queryString, callback) {
    //   var list = [{}];
    //   this.$axios
    //     .get("getLabel", { keyword: queryString, page: 1 })
    //     .then(response => {
    //       if (response.data) {
    //         //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
    //         for (let i of response.data) {
    //           i.value = i.label; //将想要展示的数据作为value
    //         }
    //         list = response.data;
    //         callback(list);
    //       } else {
    //         list.push({ value: "未搜索到结果" });
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
  },
  mounted() {
    this.getOptions();
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
</style>

