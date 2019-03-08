<template>
  <div class="container">
    <div class="top">
      <el-input v-model="input" :placeholder="search" size="small" style="width:200px;" @keyup.enter.native="goSearch">
        <i slot="prefix" class="el-input__icon el-icon-search" @click="goSearch"></i>
      </el-input>
      <el-button type="primary" size="small" class="add" @click="goAdd">新增标签 </el-button>
    </div>
    <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @select="change" @select-all="change">
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="100">
      </el-table-column>
      <el-table-column prop="tag" label="标签">
        <template slot-scope="scope">
          <span class="tag" @click="edit(scope.row.id)">{{scope.row.tag}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="纬度" :filters="[{text: '赛事', value: '赛事'}, {text: '球队', value: '0'}, {text: '球员', value: '球员'}, {text: '游戏', value: '游戏'},{text: '情报', value: '情报'}, {text: '其他', value: '其他'},]" :filter-method="filterType">
      </el-table-column>
      <el-table-column prop="sports" label="运动项" :filters="[{text: '足球', value: '足球'}, {text: '篮球', value: '篮球'}, {text: '电竞', value: '电竞'}]" :filter-method="filterSports">
      </el-table-column>
      <el-table-column prop="summary" label="标签说明">
      </el-table-column>
      <el-table-column prop="author" label="创建人">
      </el-table-column>
      <el-table-column prop="data" label="时间" sortable>
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
      tableData: [
        {
          id: 1,
          tag: "C罗",
          type: "球员",
          sports: "足球",
          summary: "这男人贼吊",
          author: "张金辉",
          data: "2018-09-18"
        },
        {
          id: 2,
          tag: "梅西",
          type: "球员",
          sports: "足球",
          summary: "这男人吊甚1号",
          author: "张金辉",
          data: "2018-09-17"
        },
        {
          id: 3,
          tag: "科比",
          type: "球员",
          sports: "篮球",
          summary: "这男人吊甚1号",
          author: "张金辉",
          data: "2018-09-19"
        },
        {
          id: 4,
          tag: "湖人",
          type: "球队",
          sports: "篮球",
          summary: "球队",
          author: "张金辉",
          data: "2018-09-19"
        }
      ], //表格数据
      id: [], //表格id
      allSelect: false, //是否全选
      dialogFormVisible: false
    };
  },
  methods: {
    //搜索功能
    goSearch() {
      console.log("你搜啥");
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
    //筛选纬度
    filterType(value, row, column) {
      console.log(value);
      console.log(row);
      console.log(column);
      return row.type === value;
    },
    //筛选运动项目
    filterSports(value, row, column) {
      //   const property = column["property"];
      return row.sports === value;
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
      if (this.id.length > 1) {
        val = val.join(",");
      } else {
        val = val;
      }
      this.$confirm("此操作将永久删除该新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delNews", {
              ids: val
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "info",
                  message: "已成功删除"
                });
                setTimeout(() => {
                  this.$router.go(0);
                }, 1000);
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
        this.$router.push({ path: "/tags/all/edit", query: { id: val[0] } });
      } else {
        this.$router.push({ path: "/tags/all/edit", query: { id: val } });
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
    getPn() {
      console.log(aa);
    },
    goAdd() {
      this.$router.push("/tags/all/add");
    }
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
