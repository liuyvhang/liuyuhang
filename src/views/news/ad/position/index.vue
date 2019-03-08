<template>
  <div class="container">
    <div class="find">
      <div class="top">
        <el-input v-model="input" :placeholder="search" size="small" style="width:200px;" @keyup.enter.native="goSearch">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="goSearch"></i>
        </el-input>
        <el-button type="primary" size="small" class="add" @click="goAdd">新增广告位</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @select="change" @select-all="change" id="#out-table">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" :show-overflow-tooltip="true" label="ID">
      </el-table-column>
      <el-table-column prop="position_name" label="广告名称">
        <template slot-scope="scope">
          <span @click="edit(scope.row.id)" class="title">{{scope.row.position_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="position_code" label="广告位编码">
      </el-table-column>
      <el-table-column prop="position_desc" label="广告位描述">
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state==0">有效</span>
          <span v-if="scope.row.state==1">无效</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelect(tableData)" size="mini" type="primary">全选</el-button>
      <el-button :disabled="id.length==0?true:false" @click="del(id)" size="mini" type="primary">删除</el-button>
      <el-button :disabled="id.length==0||id.length>1?true:false" @click="edit(id)" size="mini" type="primary">编辑</el-button>
      <el-button :disabled="id.length==0?true:false" @click="putUp(id)" size="mini" type="primary">发布</el-button>
      <el-button :disabled="id.length==0?true:false" @click="repeal(id)" size="mini" type="primary">撤销</el-button>
      <el-pagination class="page" background layout="prev, pager, next" :total="count" :page-size="rows" :current-page.sync="pn" @current-change="getPn" :pager-count="7">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "newsAdPosition",
  data() {
    return {
      tableData: [], //表格数据
      id: [], //表格id
      input: "",
      rows: 10,
      pn: 1,
      count: 1,
      allSelect: false, //是否全选
      search: this.$t("layout.search")
    };
  },
  methods: {
    //获取数据
    getData() {
      var data = {
        keyword: this.input,
        page: this.pn
      };
      this.$axios.get("getPosition", data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.ad_position_list;
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
    //分页功能
    getPn(pn) {
      this.pn = pn;
      this.getData();
      window.scrollTo(0, 0);
    },
    //新增功能
    goAdd() {
      this.$router.push("/news/position/add");
    },
    //删除功能
    del(val) {
      val = val.toString();
      this.$confirm("此操作将永久删除该广告位, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delPosition", {
              ad_position_ids: val
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "info",
                  message: "已成功删除"
                });
              }
            });
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑功能
    edit(val) {
      if (val instanceof Array) {
        this.$router.push({
          path: "/news/position/edit",
          query: { id: val[0] }
        });
      } else {
        this.$router.push({
          path: "/news/position/edit",
          query: { id: val }
        });
      }
    },
    //搜索
    find() {
      this.getData();
    }
    //发布
    // putUp(val) {
    //   val = val.toString();
    //   this.$axios.get("multiNews", { news_ids: val, status: 1 }).then(res => {
    //     if (res.code == 200) {
    //       this.getData();
    //     }
    //   });
    // },
    //撤销
    // repeal(val) {
    //   val = val.toString();
    //   this.$axios.get("multiNews", { news_ids: val, status: 2 }).then(res => {
    //     if (res.code == 200) {
    //       this.getData();
    //     }
    //   });
    // }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="css" scoped>
.img-item {
  max-height: 100px;
  width: 150px;
}

.find {
  margin: 10px 0;
}

.input {
  width: 193px;
}

.first,
.second {
  display: flex;
  margin-bottom: 20px;
}

.page {
  float: right;
}
.page,
.add {
  float: right;
}
.title {
  cursor: pointer;
}
.title:hover {
  color: #409eff;
}
.block,
.source,
.label {
  margin-right: 20px;
}

.btn {
  margin-right: 10px;
}
</style>
