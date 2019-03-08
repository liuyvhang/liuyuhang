<template>
    <div class="container">
        <div class="top">
            <el-input :placeholder="search" v-model="input" size="small" class="input-with-select" style="width:400px;" @keyup.enter.native="goSearch">
                <el-select v-model="game_id" slot="prepend" placeholder="游戏名称" style="width:100px;">
                    <el-option v-for="item in game" :key="item.id" :label="item.game_name" :value="item.id">
                    </el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
            </el-input>
            <el-button type="primary" size="small" class="add" @click="goAdd">新增攻略</el-button>
        </div>
        <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @select="change" @select-all="change">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="game_id" label="游戏ID">
            </el-table-column>
            <el-table-column prop="target_id" label="攻略ID">
            </el-table-column>
            <el-table-column prop="strategy_type" label="攻略类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.strategy_type==0">帖子</span>
                    <span v-if="scope.row.strategy_type==1">问答</span>
                    <span v-if="scope.row.strategy_type==2">活动</span>
                    <span v-if="scope.row.strategy_type==3">资讯</span>
                </template>
            </el-table-column>
            <el-table-column prop="is_valid" label="状态">
                <template slot-scope="scope">
                    <span>{{scope.row.conf_type==0?"有效":"无效"}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sort_val" label="排序值">
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
      game_id: "",
      game: [], //游戏列表
      tableData: [], //表格数据
      id: [], //表格id
      allSelect: false //是否全选
    };
  },
  methods: {
    getData() {
      this.$axios
        .get("getStrategy", { game_id: this.geme_id, page: this.pn })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.data.game_strategy_list;
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
      this.$confirm("此操作将永久删除该题库, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delStrategy", {
              game_strategy_ids: val
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
        this.$router.push({
          path: "/game/strategy/edit",
          query: { id: val[0] }
        });
      } else {
        this.$router.push({ path: "/game/strategy/edit", query: { id: val } });
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
      this.$router.push("/game/strategy/add");
    },
    getGame() {
      this.$axios.get("getGame", { page: 1 }).then(res => {
        this.game = res.data.game_list;
      });
    }
  },
  mounted() {
    this.getData();
    this.getGame();
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
.game_pic {
  height: 50px;
  height: 50px;
}
</style>
