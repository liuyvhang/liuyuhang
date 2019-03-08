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
        <el-form-item label="题库名称">
          <el-input
            v-model="formData.question_name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="状态">
          <el-radio
            v-model="formData.is_valid"
            :label="0"
          >无效</el-radio>
          <el-radio
            v-model="formData.is_valid"
            :label="1"
          >有效</el-radio>
        </el-form-item>
        <el-form-item label="随机类型">
          <el-radio
            v-model="formData.random_type"
            :label="0"
          >随机</el-radio>
          <el-radio
            v-model="formData.random_type"
            :label="1"
          >顺序</el-radio>
        </el-form-item>
        <el-form-item label="难度级别">
          <el-select
            v-model="formData.difficulty_level"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in options3"
              :key="item.blockName"
              :label="item.blockName"
              :value="item.blockName"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div
        class="third"
        v-if="this.$route.query.id"
      >
        <div class="top">
          <el-input
            v-model="input"
            :placeholder="search"
            size="small"
            style="width:200px;"
            @keyup.enter.native="goSearch"
          >
            <i
              slot="prefix"
              class="el-input__icon el-icon-search"
              @click="goSearch"
            ></i>
          </el-input>
          <el-button
            type="primary"
            size="small"
            class="add"
            @click="goAdd"
          >添加题目</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="margin-top:20px"
          max-height="300"
          ref="multipleTable"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          @select="change"
          @select-all="change"
        >
          <el-table-column
            fixed
            type="selection"
            width="30"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="subject_name"
            label="题目名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="difficulty_level"
            label="难度级别"
          >
          </el-table-column>
          <el-table-column
            prop="subject_type"
            label="题目类型"
          >
          </el-table-column>
          <el-table-column
            prop="subject_answer_index"
            label="答案"
          >
          </el-table-column>
          <el-table-column
            prop="subject_option"
            label="选项"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="is_valid"
            label="状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.is_valid==0?"有效":"无效"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="random_type"
            label="随机类型"
          >
            <template slot-scope="scope">
              <span>{{scope.row.random_type==0?"随机":"排序"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_date"
            label="创建时间"
            sortable
            width="150"
          >
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button
            @click="toggleSelect(tableData)"
            size="mini"
            type="primary"
          >全选</el-button>
          <el-button
            :disabled="id.length==0?true:false"
            @click="del(id)"
            size="mini"
            type="primary"
          >删除</el-button>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            :total="count"
            :page-size="rows"
            :current-page.sync="pn"
            @current-change="getPn"
            :pager-count="7"
          >
          </el-pagination>
        </div>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('formData')"
          v-if="$route.name=='添加题库'"
        >添加</el-button>
        <el-button
          type="primary"
          @click="editForm('formData')"
          v-if="$route.name=='编辑题库'"
        >保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="题目列表"
      :visible.sync="dialogTableVisible"
    >
      <el-input
        :placeholder="search"
        v-model="gridInput"
        size="small"
        class="input-with-select"
        style="width:400px;"
        @keyup.enter.native="goSearchGrid"
      >
        <el-select
          v-model="type"
          slot="prepend"
          placeholder="请选择"
          style="width:100px;"
        >
          <el-option
            label="全部"
            value=""
          ></el-option>
          <el-option
            label="综合"
            value="综合"
          ></el-option>
          <el-option
            label="足球"
            value="足球"
          ></el-option>
          <el-option
            label="篮球"
            value="篮球"
          ></el-option>
          <el-option
            label="羽毛球"
            value="羽毛球"
          ></el-option>
          <el-option
            label="奥运"
            value="奥运"
          ></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="goSearchGrid"
        ></el-button>
      </el-input>
      <el-table
        :data="gridData"
        border
        max-height="300"
        style="margin-top:20px"
        ref="gridTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        @select="grid"
        @select-all="grid"
      >
        <el-table-column
          type="selection"
          width="30"
          fixed
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="subject_name"
          label="题目名称"
          width="250"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="difficulty_level"
          label="难度级别"
        >
        </el-table-column>
        <el-table-column
          prop="subject_type"
          label="题目类型"
        >
        </el-table-column>
        <el-table-column
          prop="subject_answer_index"
          label="答案"
        >
        </el-table-column>
        <el-table-column
          prop="option_type"
          label="选项类型"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.option_type==0">单选</span>
            <span v-if="scope.row.option_type==1">多选</span>
            <span v-if="scope.row.option_type==2">判断</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_valid"
          label="状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.is_valid==0?"有效":"无效"}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button
          @click="toggleGridSelect(gridData)"
          size="mini"
          type="primary"
        >全选</el-button>
        <el-pagination
          class="page"
          background
          layout="prev, pager, next"
          :total="gridCount"
          :page-size="gridRows"
          :current-page.sync="gridPn"
          @current-change="getGridPn"
          :pager-count="5"
        >
        </el-pagination>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addTopic(gridId)"
        >添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: { question_name: "" },
      input: "",
      gridInput: "",
      type: "",
      search: this.$t("layout.search"),
      rows: 20,
      gridRows: 20,
      pn: 1,
      gridPn: 1,
      count: 1,
      gridCount: 1,
      tableData: [], //表格数据
      id: [], //表格id
      gridId: [],
      gridData: [],
      allSelect: false, //是否全选
      gridSelect: false,
      dialogTableVisible: false,
      rules: {},
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
    //搜索功能
    goSearch() {
      this.getList();
    },
    //总列表搜索
    goSearchGrid() {
      this.getGrid();
    },
    //获取题库信息
    getData() {
      this.$axios
        .get("infoBank", { question_id: this.$route.query.id })
        .then(res => {
          if (res.code == 200) {
            this.formData = res.data.question;
          }
        });
    },
    //获取总题目列表
    getGrid() {
      this.$axios
        .get("getTopic", {
          page: this.gridPn,
          keyword: this.gridInput,
          question_id: this.$route.query.id,
          type: this.type
        })
        .then(res => {
          if (res.code == 200) {
            this.gridData = res.data.question_subject_list;
            this.gridCount = res.data.total_record;
          }
        });
    },
    //题库题目全选功能
    toggleSelect(rows) {
      this.id = [];
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, !this.allSelect);
          this.id.push(row.id);
        });
        this.allSelect = !this.allSelect;
      }
      if (!this.allSelect) {
        this.id = [];
      }
    },
    //总题目全选功能
    toggleGridSelect(rows) {
      this.gridId = [];
      if (rows) {
        rows.forEach(row => {
          this.$refs.gridTable.toggleRowSelection(row, !this.gridSelect);
          this.gridId.push(row.id);
        });
        this.gridSelect = !this.gridSelect;
      }
      if (!this.gridSelect) {
        this.gridId = [];
      }
    },
    //获取题库题目id
    change(selection, row) {
      this.id = [];
      if (selection.length > 0) {
        for (var i = 0; i < selection.length; i++) {
          this.id[i] = selection[i].id;
        }
      } else {
        console.log("请选择数据");
      }
    },
    //获取总题库id
    grid(selection, row) {
      this.gridId = [];
      if (selection.length > 0) {
        for (var i = 0; i < selection.length; i++) {
          this.gridId[i] = selection[i].id;
        }
      } else {
        console.log("请选择数据");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //添加
    submitForm(formName) {
      let data = {
        ...this.formData
      };
      this.$axios.post("addBank", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "题库添加成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/bank" });
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
      this.$axios.post("updateBank", data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "题库编辑成功"
          });
          this.$refs[formName].resetFields();
          this.$router.push({ path: "/game/bank" });
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
    //删除
    del(val) {
      val = val.toString();
      this.$confirm("此操作将从题库移除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delSubject", {
              question_id: this.$route.query.id,
              subject_ids: val
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "已成功删除"
                });
                this.getList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //向题库添加题目
    goAdd() {
      this.dialogTableVisible = true;
      this.getGrid();
    },
    //分页功能
    getPn(pn) {
      this.pn = pn;
      this.getList();
    },
    getGridPn(pn) {
      this.gridPn = pn;
      this.getGrid();
    },
    //获取题目题库列表
    getList() {
      this.$axios
        .get("subjectList", {
          page: this.pn,
          question_id: this.$route.query.id
        })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data.question_subject_list;
            this.count = res.data.total_record;
          }
        });
    },
    addTopic(val) {
      var id = val.toString();
      this.$axios
        .get("addSubject", {
          question_id: this.$route.query.id,
          subject_ids: id
        })
        .then(res => {
          if (res.code == 200) {
            this.$message.success(`本次成功新增${val.length}条题目`);
            this.dialogTableVisible = false;
            this.getList();
          }
        });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getData();
    }
    this.getList();
    this.getAll();
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
</style>

 <style scoped>
.container {
  padding: 30px 80px 0 90px;
}
.top {
  width: 100%;
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
.page {
  float: right;
}
</style>

