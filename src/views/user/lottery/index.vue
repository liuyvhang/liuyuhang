<template>
  <div class="container">
    <div class="top">
      <!-- <el-button
        type="primary"
        size="small"
        class="add"
        @click="goAdd"
      >新增抽奖 </el-button> -->
      <el-button
        type="primary"
        size="small"
        class="add"
        @click="goAdd"
      >新增抽奖 </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="margin-top:20px"
      ref="multipleTable"
      tooltip-effect="dark"
    >
      <el-table-column
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
        label="抽奖名称"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            class="nick_name"
            @click="edit(scope.row.id)"
          >{{scope.row.luck_draw_title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="luck_draw_start_date"
        label="开始时间"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="luck_draw_end_date"
        label="结束时间"
        sortable
        width="180"
      >
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <!-- <el-button
        @click="toggleSelect(tableData)"
        size="mini"
        type="primary"
      >全选</el-button> -->
      <!-- <el-button
        :disabled="id.length==0?true:false"
        @click="del(id)"
        size="mini"
        type="primary"
      >删除</el-button> -->
      <el-button
        :disabled="id.length==0?true:false"
        @click="edit(id)"
        size="mini"
        type="primary"
      >编辑</el-button>
      <!-- <el-pagination
        class="page"
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="rows"
        :current-page.sync="pn"
        @current-change="getPn"
        :pager-count="7"
      >
      </el-pagination> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "", //搜索内容
      search: this.$t("layout.search"),
      rows: 10,
      pn: 1,
      count: 1,
      select: 2,
      tableData: [], //表格数据
      id: [], //表格id
      allSelect: false, //是否全选
      dialogFormVisible: false
    };
  },
  methods: {
    //搜索功能
    goSearch() {
      this.getData();
    },
    //获取数据
    getData() {
      var data = {
        luck_draw_type: 2
      };
      console.log(data);
      this.$axios.get("getPrize", data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.prizePlanList;
        }
      });
    },
    //分页功能
    getPn(pn) {
      this.pn = pn;
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
    // del(val) {
    //   if (this.id.length > 1) {
    //     val = val.toString();
    //   } else {
    //     val = val.toString();
    //   }
    //   this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.$axios
    //         .get("delUser", {
    //           ids: val
    //         })
    //         .then(res => {
    //           if (res.code == 200) {
    //             this.$message({
    //               type: "info",
    //               message: "已成功删除"
    //             });
    //             this.getData();
    //           }
    //         });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    //编辑
    edit(val) {
      if (val instanceof Array) {
        this.$router.push({
          path: "/user/lottery/edit",
          query: { id: val[0] }
        });
      } else {
        this.$router.push({ path: "/user/lottery/edit", query: { id: val } });
      }
    },
    goAdd() {
      this.$router.push("/user/lottery/add");
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style>
.container {
  overflow: auto;
}
</style>

<style scoped>
.top {
  margin: 10px 0 20px;
}
.page,
.add {
  float: right;
  margin-bottom: 20px;
}
.nick_name {
  cursor: pointer;
}
.nick_name:hover {
  color: #409eff;
}
</style>
