<template>
  <div class="container">
    <div class="top">
      <el-input :placeholder="search" v-model="input" size="small" class="input-with-select" style="width:400px;" @keyup.enter.native="goSearch">
        <el-select v-model="type" slot="prepend" placeholder="请选择" style="width:100px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="综合" value="综合"></el-option>
          <el-option label="足球" value="足球"></el-option>
          <el-option label="篮球" value="篮球"></el-option>
          <el-option label="羽毛球" value="羽毛球"></el-option>
          <el-option label="奥运" value="奥运"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
      </el-input>
      <el-upload class="upload-demo" ref="upload" :action="uploadUrl()" :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
        <el-button slot="trigger" type="success" size="small" class="export" @click="submitUpload">批量导入 </el-button>
        <el-button type="primary" size="small" class="add" @click="goAdd">新增题目 </el-button>
      </el-upload>
    </div>
    <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @select="change" @select-all="change">
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column prop="id" label="ID" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="subject_name" label="题目名称" width="250" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="subject_name" @click="edit(scope.row.id)">{{scope.row.subject_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="difficulty_level" label="难度级别">
      </el-table-column>
      <el-table-column prop="subject_type" label="题目类型">
      </el-table-column>
      <el-table-column prop="subject_answer_index" label="答案">
      </el-table-column>
      <el-table-column prop="option_type" label="选项类型">
        <template slot-scope="scope">
          <span v-if="scope.row.option_type==0">单选</span>
          <span v-if="scope.row.option_type==1">多选</span>
          <span v-if="scope.row.option_type==2">判断</span>
        </template>
      </el-table-column>
      <el-table-column prop="is_valid" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.is_valid==0?"有效":"无效"}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelect(tableData)" size="mini" type="primary">全选</el-button>
      <el-button :disabled="id.length==0?true:false" @click="del(id)" size="mini" type="primary">删除</el-button>
      <el-button :disabled="id.length==0?true:false" @click="edit(id)" size="mini" type="primary">编辑</el-button>
      <el-pagination class="page" background layout="prev, pager, next" :total="count" :page-size="rows" :current-page.sync="pn" @current-change="getPn" :pager-count="7">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "", //搜索内容
      search: this.$t("layout.search"),
      rows: 20,
      pn: 1,
      count: 1,
      type: "",
      tableData: [], //表格数据
      id: [], //表格id
      allSelect: false //是否全选
    };
  },
  methods: {
    uploadUrl() {
      return `${
        process.env.BASE_API
      }gameApiService/questionSubject/batchImport`;
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.$message.success("文件导入成功");
      } else {
        this.$message.warning(res.msg);
      }
    },
    beforeAvatarUpload(file) {
      console.log(file);
      var index = file.name.lastIndexOf(".");
      //获取后缀
      var ext = file.name.substr(index + 1);
      if (ext === "xls" || ext === "xlsx") {
        return file;
      } else {
        this.$message.error("上传文件只能是 xls/xlsx 格式!");
        return false;
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    //搜索功能
    goSearch() {
      this.getData();
    },
    //获取数据
    getData() {
      var data = {
        page: this.pn,
        keyword: this.input,
        type: this.type
      };
      console.log(data);
      this.$axios.get("getTopic", data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.question_subject_list;
          this.count = res.data.total_record;
        }
      });
    },
    //分页功能
    getPn(pn) {
      this.pn = pn;
      this.getData();
      window.scrollTo(0, 0);
    },
    //全选功能
    toggleSelect(rows) {
      this.id = [];
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, !this.allSelect);
          this.id.push(row.user_id);
        });
        this.allSelect = !this.allSelect;
      }
      if (!this.allSelect) {
        this.id = [];
      }
    },
    //获取id
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除
    del(val) {
      val = val.toString();
      this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delTopic", {
              subject_ids: val
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "已成功删除"
                });
                this.getData();
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
    //编辑
    edit(val) {
      if (val instanceof Array) {
        this.$router.push({ path: "/game/topic/edit", query: { id: val[0] } });
      } else {
        this.$router.push({ path: "/game/topic/edit", query: { id: val } });
      }
    },
    goAdd() {
      this.$router.push("/game/topic/add");
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style scoped>
.top {
  margin: 10px 0 20px;
  display: flex;
}
.page {
  float: right;
}
.upload-demo {
  display: flex;
  justify-content: flex-end;
}
.subject_name {
  cursor: pointer;
}
.subject_name:hover {
  color: #409eff;
}
.export,
.add {
  margin-left: 10px;
}
</style>
