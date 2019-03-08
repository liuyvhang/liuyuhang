<template>
  <div class="container">
    <div class="top">
      <el-input v-model="input" :placeholder="search" size="small" style="width:200px;" @keyup.enter.native="goSearch">
        <i slot="prefix" class="el-input__icon el-icon-search" @click="goSearch"></i>
      </el-input>
      <el-button type="primary" size="small" class="add" @click="goAdd">新增社群分类</el-button>
    </div>
    <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @select="change" @select-all="change">
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column prop="id" label="ID" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="社群分类名称">
        <template slot-scope="scope">
          <span @click="edit(scope.row.id)" class="title">{{scope.row.community_classify_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="community_classify_desc" label="社群分类描述">
      </el-table-column>
      <el-table-column label="社群分类图片">
        <!-- <template slot-scope="scope">
          <img :src="scope.row.community_classify_pic" class="classify_pic">
        </template> -->
      </el-table-column>
      <el-table-column prop="is_valid" label="状态">
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
      allSelect: false //是否全选
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
        keyword: this.input,
        page: this.pn
      };
      this.$axios.get("getClassify", data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.communityClassifyList;
          this.count = res.data.total_record;
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
    //赋id
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除
    del(val) {
      if (this.id.length > 1) {
        val = val.toString();
      } else {
        val = val.toString();
      }
      this.$confirm("此操作将永久删除该社群分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delClassify", {
              deleteType: 0,
              ids: val
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "已成功删除"
                });
                this.getData();
                this.id = [];
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
        this.$router.push({
          path: "/group/classify/edit",
          query: { id: val[0] }
        });
      } else {
        this.$router.push({ path: "/group/classify/edit", query: { id: val } });
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
    //新增标签
    goAdd() {
      this.$router.push("/group/classify/add");
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
.active {
  cursor: pointer;
}
.classify_pic {
  width: 50px;
  height: 50px;
}
.title {
  cursor: pointer;
}
.title:hover {
  color: #409eff;
}
</style>
