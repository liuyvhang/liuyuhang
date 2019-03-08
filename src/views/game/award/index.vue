<template>
  <div class="container">
    <div class="top">
      <el-input
        :placeholder="search"
        v-model="input"
        size="small"
        class="input-with-select"
        style="width:500px;"
        @keyup.enter.native="goSearch"
      >
        <el-select
          v-model="match_id"
          slot="prepend"
          placeholder="请选择"
          style="width:150px;"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.match_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="goSearch"
        ></el-button>
      </el-input>
      <el-button
        type="primary"
        size="small"
        class="add"
        @click="goAdd"
      >新增奖励 </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      height="550"
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
        prop="reward_name"
        label="奖励名称"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            class="nick_name"
            @click="edit(scope.row.id)"
          >{{scope.row.reward_name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="match_id"
        label="赛事"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="product_id"
        label="产品"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="ranking"
        label="排名"
      >
      </el-table-column>
      <el-table-column
        prop="reward_desc"
        label="奖励描述"
      >
      </el-table-column>
      <el-table-column
        prop="reward_num"
        label="奖励数量"
      >
      </el-table-column>
      <el-table-column
        prop="reward_type"
        label="奖励类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.reward_type === 0">积分</span>
          <span v-if="scope.row.reward_type === 1">虚拟物品</span>
          <span v-if="scope.row.reward_type === 2">实物</span>
        </template>
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
      rows: 20,
      pn: 1,
      count: 1,
      match_id: "",
      options: [],
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
        page: this.pn,
        keyword: this.input,
        match_id: this.match_id
      };
      this.$axios.get("getAward", data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.game_reward_list;
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除
    del(val) {
      val = val.toString();
      this.$confirm("此操作将永久删除该奖励, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delAward", {
              reward_ids: val
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
        this.$router.push({ path: "/game/award/edit", query: { id: val[0] } });
      } else {
        this.$router.push({ path: "/game/award/edit", query: { id: val } });
      }
    },
    goAdd() {
      this.$router.push("/game/award/add");
    },
    getOptions() {
      this.$axios.get("getMatch", { page: 0 }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.options = res.data.game_match_list;
        }
      });
    }
  },
  mounted() {
    this.getOptions();
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
.nick_name {
  cursor: pointer;
}
.nick_name:hover {
  color: #409eff;
}
</style>
