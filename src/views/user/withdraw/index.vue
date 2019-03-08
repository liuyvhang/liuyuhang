<template>
  <div class="container">
    <div class="find">
      <div class="top">
        <el-input
          :placeholder="search"
          v-model="input"
          size="small"
          class="input-with-select"
          style="width:400px;"
          @keyup.enter.native="goSearch"
        >
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="请选择"
            style="width:100px;"
          >
            <el-option
              label="普通用户"
              :value="0"
            ></el-option>
            <el-option
              label="系统用户"
              :value="1"
            ></el-option>
            <el-option
              label="全部用户"
              :value="2"
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="goSearch"
          ></el-button>
        </el-input>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="margin-top:20px"
      :row-style="{height:'30px'}"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      @select="change"
      @select-all="change"
      @sort-change="sortChange"
      @filter-change="filterChange"
      id="#out-table"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="user_id"
        :show-overflow-tooltip="true"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="nick_name"
        :show-overflow-tooltip="true"
        label="昵称"
      >
      </el-table-column>
      <el-table-column
        prop="account"
        label="提现金额"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="release_status"
        column-key="release_status"
        label="状态"
        :filters="filters"
        :filter-multiple="false"
        :filter-method="filterState"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.release_status === 0">已通过</span>
          <span v-if="scope.row.release_status === 1">审核中</span>
          <span v-if="scope.row.release_status === 2">未通过</span>
        </template>
      </el-table-column>
      <el-table-column
        :render-header="renderHeader"
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          {{scope.row.pub_date}}
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
        @click="putUp(id)"
        size="mini"
        type="primary"
      >审核</el-button>
      <el-button
        :disabled="id.length==0?true:false"
        @click="repeal(id)"
        size="mini"
        type="primary"
      >撤销</el-button>
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
  name: "withdraw",
  data() {
    return {
      tableData: [], //表格数据
      id: [], //表格id
      options: [], //板块数据
      select: 2,
      input: "",
      order: "",
      sort: "",
      startTime: "",
      endTime: "",
      status: "",
      weigh: "",
      rows: 20,
      pn: 1,
      count: 1,
      allSelect: false, //是否全选
      search: this.$t("layout.search"),
      filters: [
        { text: "已发布", value: 0 },
        { text: "审核中", value: 1 },
        { text: "已删除", value: 2 }
      ],
      options: [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
        { label: 5, value: 5 }
      ],
      date: "", //日期
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    filterHandler(value, row, column) {
      console.log(value, row, column);
      const property = column["property"];
      return row[property] === value;
    },
    filterState(value, row, column) {
      console.log(value);
      console.log(row);
      console.log(column);
    },
    filterChange(filters) {
      console.log(filters);
    },
    sortChange(val) {
      this.order = val.prop;
      if (val.order == "ascending") {
        this.sort = "asc";
      }
      if (val.order == "descending") {
        this.sort = "desc";
      }
      this.getData();
    },
    //获取数据
    getData() {
      this.tableData = [];
      var data = {
        keyword: this.input,
        page: this.pn,
        type: 0,
        order: this.order,
        sort: this.sort,
        startTime: this.startTime,
        endTime: this.endTime,
        status: this.status,
        weigh: this.weigh
      };
      this.$axios.get("getNews", data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.news_list;
          this.count = res.data.total_record;
        }
      });
    },
    //搜索功能
    goSearch() {
      this.pn = 1;
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
    //搜索
    find() {
      this.pn = 1;
      this.getData();
    },
    //发布
    putUp(val) {
      val = val.toString();
      this.$axios.get("multiNews", { news_ids: val, status: 1 }).then(res => {
        if (res.code == 200) {
          this.getData();
        }
      });
    },
    //撤销
    repeal(val) {
      val = val.toString();
      this.$axios.get("multiNews", { news_ids: val, status: 2 }).then(res => {
        if (res.code == 200) {
          this.getData();
        }
      });
    },
    handleDataRangeChange() {
      if (this.date) {
        this.startTime = this.date[0];
        this.endTime = this.date[1];
        this.getData();
      }
    },
    renderHeader(h, context) {
      return (
        <span class="dateColumn">
          <span class="columeLable">{context.column.label}</span>
          <span class="columeIcon">
            <el-date-picker
              class="dataTimePick"
              size="mini"
              style="display:none"
              style="width:0;visibility:hidden"
              ref={"timer"}
              v-model={this.date}
              type="datetimerange"
              picker-options={this.pickerOptions}
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              on-change={this.handleDataRangeChange}
              align="center"
            />
            <i
              class="el-icon-date dataIcon"
              style="position:absolute;top:8px;left:68px"
              onClick={e => {
                context.store.table.$refs.tableHeader.$refs.timer.focus();
              }}
            />
          </span>
        </span>
      );
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style>
/* .zujian {
  position: absolute;
  top: 6px;
  left: 70px;
  cursor: pointer;
}
.datePick {
  opacity: 1 !important;
  position: absolute;
  left: 0;
  top: -2px;
  display: none;
} */
</style>

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
