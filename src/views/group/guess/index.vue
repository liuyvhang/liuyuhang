<template>
  <div class="guessContainer">
    <div class="top">
      <el-input v-model="input" :placeholder="search" size="small" style="width:200px;" @keyup.enter.native="goSearch">
        <i slot="prefix" class="el-input__icon el-icon-search" @click="goSearch"></i>
      </el-input>
      <el-button type="primary" size="small" class="add" @click="goAdd">新增竞猜</el-button>
    </div>
    <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @select="change" @select-all="change">
      <el-table-column type="selection" :selectable='checkboxT' width="50" disabled='true'>
      </el-table-column>
      <el-table-column prop="activity_title" label="标题">
      </el-table-column>
      <el-table-column prop="activity_title" label="社群">
      </el-table-column>
      <el-table-column prop="guess_start_date" label="开始时间">
      </el-table-column>
      <el-table-column prop="guess_end_date" label="结束时间">
      </el-table-column>
      <el-table-column prop="integral_total" label="总积分">
      </el-table-column>
      <el-table-column label="竞猜详情" min-width="300px" align="center">
        <template slot-scope="scope">
          <div class="guess" v-for="(item,index) in scope.row.guessInfoDetail" :key="index">
            <div class="topic">{{item.guess_subject[0]}}VS{{item.guess_subject[1]}}</div>
            <el-select size="mini" style="width:150px;margin-left:20px" v-if="item.guess_type==1" v-model="guessResult[scope.$index][index]" placeholder="请选择" value-key="id">
              <el-option v-for="val in item.guess_detail" :key="val.id" :label="val.score" :value="val">
              </el-option>
            </el-select>
            <el-select size="mini" style="width:150px;margin-left:20px" v-if="item.guess_type==0" v-model="guessResult[scope.$index][index]" placeholder="请选择" value-key="id">
              <el-option v-for="val in item.guess_detail" :key="val.id" :label="val.item" :value="val">
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" :disabled="scope.row.is_settlement==0?false:true" @click="account(scope.row,scope.$index)">结算</el-button>
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
      guessResult: [
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}]
      ],
      guessOptions: [],
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
    checkboxT(row, index) {
      let start_date = Date.parse(new Date(row.guess_start_date));
      let current_date = Date.parse(new Date());
      let mesc = current_date - start_date;
      if (mesc > 0) {
        return 0;
      } else {
        return 1;
      }
    },
    account(row, index) {
      let arr = [];
      row.guessInfoDetail.map((item, idx) => {
        arr[idx] = {
          id: item.id,
          user_guess_result: this.guessResult[index][idx].id
        };
      });
      let data = {
        activityId: row.id,
        guess_detail_id: row.activity_id,
        is_settlement: 1,
        is_valid: 1,
        guessInfoDetail: arr
      };
      this.$axios.post("accountGuess", data).then(res => {
        if (res.code == 200) {
          this.$message.success("结算成功");
          this.getData();
        }
      });
    },
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   // if (rowIndex % 2 === 0) {
    //   //   if (columnIndex === 0) {
    //   //     return [1, 2];
    //   //   } else if (columnIndex === 1) {
    //   //     return [0, 0];
    //   //   }
    //   // }
    // },
    getData() {
      this.$axios
        .get("getGuess", {
          keyWord: this.input,
          page: this.pn,
          id: "30be03b3acf543a3844ff4201c8155ae"
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.data.activityInfoList;
            this.tableData.map(item => {
              item.guessInfoDetail.map(val => {
                val.guess_subject = val.guess_subject.split(",");
                if (val.guess_type == 0) {
                  //胜负形式
                  let arr = [];
                  val.guess_detail.map(info => {
                    arr.push(info);
                  });
                  val.guess_detail = arr;
                }
                if (val.guess_type == 1) {
                  //比分形式
                  let arr = [];
                  val.guess_detail.map(info => {
                    arr.push(...info.scores);
                  });
                  val.guess_detail = arr;
                }
              });
            });
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
      this.$confirm("此操作将永久删除该竞猜, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delGuess", {
              activity_type: 0,
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
        this.$router.push({ path: "/group/guess/edit", query: { id: val[0] } });
      } else {
        this.$router.push({ path: "/group/guess/edit", query: { id: val } });
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
      this.$router.push("/group/guess/add");
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style>
body .el-table th.gutter {
  display: table-cell !important;
}
.guess {
  display: flex;
  padding-left: 10px;
  border-bottom: 1px solid #ebeef5;
  line-height: 3;
}
.guess:last-child {
  border-bottom: none;
}
.guessContainer {
  overflow: auto;
}
.guessContainer .el-table td:nth-child(7) .cell {
  padding: 0 !important;
}
.guessContainer .el-table td:nth-child(7) {
  padding: 0 !important;
}
</style>

<style scoped>
.topic {
  width: 50%;
  border-right: 1px solid #ebeef5;
}
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
