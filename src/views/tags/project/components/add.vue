<template>
  <div class="add">
    <el-button
      size="mini"
      type="success"
      @click="dialogFormVisible=true,getData()"
    >新增</el-button>
    <!-- 添加节点 -->
    <el-dialog
      title="添加节点"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="tagsData"
        :model="tagsData"
        label-width="80px"
        :rules="rules"
        @close="closeDialog('tagsData')"
      >
        <div class="first">
          <el-form-item
            label="标题"
            prop="label"
          >
            <el-input
              v-model="tagsData.label"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </div>
        <div class="second">
          <el-form-item
            label="推荐"
            prop="is_default_recommend"
          >
            <el-radio
              v-model="tagsData.is_default_recommend"
              :label="1"
            >是</el-radio>
            <el-radio
              v-model="tagsData.is_default_recommend"
              :label="0"
            >否</el-radio>
          </el-form-item>
          <el-form-item
            label="热门"
            prop="is_hot"
          >
            <el-radio
              v-model="tagsData.is_hot"
              :label="1"
            >是</el-radio>
            <el-radio
              v-model="tagsData.is_hot"
              :label="0"
            >否</el-radio>
          </el-form-item>
          <el-form-item
            label="删除"
            prop="is_remove"
          >
            <el-radio
              v-model="tagsData.is_remove"
              :label="1"
            >是</el-radio>
            <el-radio
              v-model="tagsData.is_remove"
              :label="0"
            >否</el-radio>
          </el-form-item>
          <el-form-item label="标签描述">
            <el-input
              v-model="tagsData.label_desc"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </div>
        <div class="third">
          <el-form-item
            label="权重"
            prop="weight"
          >
            <el-input
              v-model.number="tagsData.weight"
              placeholder="请输入0~1的数字"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序值">
            <el-select
              v-model="tagsData.sort_val"
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
        </div>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="submit('tagsData')"
        >添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    editId: {
      type: String
    },
    level: {
      type: Number
    }
  },
  data() {
    var checkWeight = (rule, value, callback) => {
      let regExp = /0\.[0-9]*[1-9]{1}$/;
      if (value === "") {
        callback(new Error("请输入权重"));
      }
      if (regExp.test(value) === false) {
        callback(new Error("权重为小数"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      tagsData: {
        label: "",
        channel_id: "",
        is_default_recommend: "",
        is_hot: "",
        is_remove: "",
        label_desc: "",
        lable_level: "",
        sort_val: "",
        weight: ""
      },
      options1: [
        { channel_name: "篮球", id: 1 },
        { channel_name: "足球", id: 2 }
      ],
      options2: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ],
      rules: {
        label: [{ required: true, message: "请输入节点名", trigger: "blur" }],
        is_default_recommend: [
          { required: true, message: "请选择是否默认", trigger: "change" }
        ],
        is_hot: [
          { required: true, message: "请选择是否推荐", trigger: "change" }
        ],
        is_remove: [
          { required: true, message: "请选择是否删除", trigger: "change" }
        ],
        weight: [{ validator: checkWeight, trigger: "blur" }]
      },
      msg: "h",
      parent: {}
    };
  },
  methods: {
    getData() {
      console.log(this.editId);
      if (this.level == 0) {
        this.$axios
          .get("infoChannel", { channel_id: this.editId })
          .then(res => {
            console.log(res);
            this.parent = res.data.label;
          });
      } else {
        this.$axios.get("infoLabel", { label_id: this.editId }).then(res => {
          this.parent = res.data.label;
        });
      }
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.level == 0) {
            let data = {
              ...this.tagsData,
              parent_id: "",
              label_level: this.level + 1,
              channel_id: this.editId
            };
            console.log(data);
            this.$axios.post("addLabel", data).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "节点添加成功"
                });
                this.$emit("refresh", this.editId);
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
              }
            });
          } else {
            let data = {
              ...this.tagsData,
              parent_id: this.parent.id,
              label_level: this.parent.label_level + 1,
              channel_id: this.parent.channel_id
            };
            console.log(data);
            this.$axios.post("addLabel", data).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "节点添加成功"
                });
                this.$emit("refresh", this.editId);
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
              }
            });
          }
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
    closeDialog(formName) {
      this.tagsData = {};
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>
