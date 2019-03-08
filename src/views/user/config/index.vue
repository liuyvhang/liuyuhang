<template>
  <div class="container">
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
        @click="goSignIn"
      >新增配置 </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="margin-top:20px"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      @select="change"
      @select-all="change"
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
        prop="conf_item"
        label="配置项"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            class="conf_item"
            @click="edit(scope.row.id)"
            v-if="scope.row.conf_item === '0'"
          >签到配置</span>
          <span
            class="conf_item"
            @click="edit(scope.row.id)"
            v-if="scope.row.conf_item === '1'"
          >连续签到配置</span>
          <span
            class="conf_item"
            @click="edit(scope.row.id)"
            v-if="scope.row.conf_item === '2'"
          >邀请红包奖励</span>
          <span
            class="conf_item"
            @click="edit(scope.row.id)"
            v-if="scope.row.conf_item === '3'"
          >邀请激活任务配置</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="conf_type"
        label="配置类型"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.conf_item === '0'&&scope.row.conf_type === 0">单次签到奖励积分</span>
          <span v-if="scope.row.conf_item === '0'&&scope.row.conf_type === 1">单次签到奖励道具</span>
          <span v-if="scope.row.conf_item === '1'">连续签到次数</span>
          <span v-if="scope.row.conf_item === '2'&&scope.row.conf_type === 0">红包奖励</span>
          <span v-if="scope.row.conf_item === '3'&&scope.row.conf_type === 0">浏览资讯数</span>
          <span v-if="scope.row.conf_item === '3'&&scope.row.conf_type === 1">评论资讯数</span>
          <span v-if="scope.row.conf_item === '3'&&scope.row.conf_type === 2">加入社群数</span>
          <span v-if="scope.row.conf_item === '3'&&scope.row.conf_type === 3">发帖数</span>
          <span v-if="scope.row.conf_item === '3'&&scope.row.conf_type === 4">签到数</span>
        </template>
      </el-table-column>
      <el-table-column
        label="配置值"
        prop="conf_value"
      ></el-table-column>
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
      <el-button
        :disabled="id.length==0?true:false"
        @click="edit(id)"
        size="mini"
        type="primary"
      >编辑</el-button>
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
        page: this.pn
      };
      console.log(data);
      this.$axios.get("getUserConf", data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.confList;
          this.count = res.data.totalSize;
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
    del(val) {
      val = val.toString();
      this.$confirm("此操作将永久删除该通用配置, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delUserConf", {
              ids: val
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
        this.$router.push({ path: "/user/config/edit", query: { id: val[0] } });
      } else {
        this.$router.push({ path: "/user/config/edit", query: { id: val } });
      }
    },
    goSignIn() {
      this.$router.push("/user/config/add");
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
}
.conf_item {
  cursor: pointer;
}
.conf_item:hover {
  color: #409eff;
}
</style>
