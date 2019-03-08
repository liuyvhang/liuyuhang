<template>
  <div class="container">
    <div class="top">
      <el-input v-model="input" :placeholder="search" size="small" style="width:200px;" @keyup.enter.native="goSearch">
        <i slot="prefix" class="el-input__icon el-icon-search" @click="goSearch"></i>
      </el-input>
      <el-button type="primary" size="small" class="add" @click="goAdd">新增热搜</el-button>
    </div>
    <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @select="change" @select-all="change">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="hot_val" label="热度值">
      </el-table-column>
      <el-table-column prop="label_name" label="标签">
        <template slot-scope="scope">
          <span class="tag" @click="edit(scope.row.id)">{{scope.row.label_name}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelect(tableData)" size="mini" type="primary">全选</el-button>
      <el-button :disabled="id.length==0?true:false" @click="del(id)" size="mini" type="primary">删除</el-button>
      <el-button :disabled="id.length==0||id.length>1?true:false" @click="edit(id)" size="mini" type="primary">编辑</el-button>
      <el-button :disabled="id.length==0?true:false" @click="putUp(id)" size="mini" type="primary">发布</el-button>
      <el-button :disabled="id.length==0?true:false" @click="repeal(id)" size="mini" type="primary">撤销</el-button>
      <el-button :disabled="id.length==0||id.length>1?true:false" @click="dialogFormVisible = true,banner(id)" size="mini" type="primary">生成Banner</el-button>
      <el-pagination class="page" background layout="prev, pager, next" :total="count" :page-size="rows" :current-page.sync="pn" @current-change="getPn" :pager-count="7">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      search: this.$t("layout.search"),
      rows: 10,
      pn: 1,
      count: 1,
      tableData: [], //表格数据
      id: [], //表格id
      allSelect: false, //是否全选
      dialogFormVisible: false
    };
  },
  methods: {
    getData() {
      this.$axios
        .get("getHot", { keyword: this.input, page: this.pn })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.data.hot_search_list;
            this.count = res.data.total_record;
          }
        });
    },
    //搜索功能
    goSearch() {
      this.getData();
    },
    //全选功能
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
    //删除
    del(val) {
      val = val.toString();
      this.$confirm("此操作将永久删除该热搜, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delHot", {
              hot_search_ids: val
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "info",
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
        this.$router.push({ path: "/tags/hot/edit", query: { id: val[0] } });
      } else {
        this.$router.push({ path: "/tags/hot/edit", query: { id: val } });
      }
    },
    //发布
    putUp(val) {
      console.log(val);
    },
    //撤销
    repeal(val) {
      console.log(val);
    },
    //生成banner
    banner(val) {
      console.log(val);
    },
    //分页功能
    getPn(pn) {
      this.pn = pn;
      this.getData();
    },
    goAdd() {
      this.$router.push("/tags/hot/add");
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style scoped>
.page,
.add {
  float: right;
}
.tag {
  cursor: pointer;
}
.tag:hover {
  color: #409eff;
}
</style>
