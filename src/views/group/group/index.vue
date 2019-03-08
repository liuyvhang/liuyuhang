<template>
  <div>
    <div class="find">
      <div class="top">
        <el-input v-model="input" :placeholder="search" size="small" style="width:200px;" @keyup.enter.native="goSearch">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="goSearch"></i>
        </el-input>
        <el-button type="primary" size="small" class="add" @click="goAdd">新增社群</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @select="change" @select-all="change" @sort-change="sortChange" @filter-change="filterChange" id="#out-table">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="community_name" label="社群名称" :show-overflow-tooltip="true" width="150">
        <template slot-scope="scope">
          <span @click="edit(scope.row.id)" class="title">{{scope.row.community_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="groupOwner" label="群主" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="deputyGroupOwner" label="副群主" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="groupUser" label="成员">
      </el-table-column>
      <el-table-column prop="community_post" label="帖子" sortable>
      </el-table-column>
      <el-table-column prop="activity" label="活动" sortable>
      </el-table-column>
      <el-table-column prop="questionAnswer" label="问答" sortable>
      </el-table-column>
      <el-table-column prop="community_classify_id" column-key="community_classify_id" label="分类" :filters="classify" :filter-multiple="false" :filter-method="filterClassify"  :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="community_label_id" column-key="community_label_id" label="标签" :filters="label" :filter-multiple="false" :filter-method="filterLabel"  :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="reg_date" label="创建时间">
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
  data() {
    return {
      tableData: [], //表格数据
      id: [], //表格id
      input: "",
      rows: 10,
      pn: 1,
      count: 1,
      allSelect: false, //是否全选
      search: this.$t("layout.search"),
      classify: [],
      label: []
    };
  },
  methods: {
    sortChange(val) {},
    filterChange(val) {},
    //获取数据
    getData() {
      var data = {
        page: this.pn,
        keyword: this.input
      };
      this.$axios.get("getGroup", data).then(res => {
        if (res.code == 200) {
          res.data.backAssociationList.map(item => {
            item.deputyGroupOwner = item.deputyGroupOwner.toString();
          });
          this.tableData = res.data.backAssociationList;
          this.count = res.data.total_record;
        }
      });
    },
    //搜索功能
    goSearch() {
      var data = {
        page: this.pn,
        keyword: this.input
      };
      this.$axios.get("searchGroup", data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.searchAssociationList;
          this.count = res.data.total_record;
        }
      });
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
      this.$router.push("/group/group/add");
    },
    //删除功能
    del(val) {
      val = val.toString();
      this.$confirm("此操作将永久删除该社群, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delGroup", {
              ids: val
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
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
        this.$router.push({ path: "/group/group/edit", query: { id: val[0] } });
      } else {
        this.$router.push({ path: "/group/group/edit", query: { id: val } });
      }
    },
    //搜索
    find() {
      this.getData();
    },
    filterClassify(value, row, column) {},
    filterLabel(value, row, column) {},
    getOptions() {
      this.$axios.get("getClassify", { page: 1 }).then(res => {
        if (res.code == 200) {
          this.classify = res.data.communityClassifyList.map(item => {
            return {
              text: item.community_classify_name,
              value: item.community_classify_name
            };
          });
        }
      });
    },
    getOptions1() {
      this.$axios.get("getLabelList", { page: 1 }).then(res => {
        if (res.code == 200) {
          this.label = res.data.communityClassifyLabelList.map(item => {
            return {
              text: item.community_label_name,
              value: item.community_label_name
            };
          });
          console.log(this.label);
        }
      });
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
    this.getOptions();
    this.getOptions1();
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
