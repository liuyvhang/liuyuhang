<template>
  <div>
    <div class="find">
      <div class="first">
        <div class="block">
          <span>板块:</span>
          <el-select v-model="formData.blockName" placeholder="请选择" size="mini" class="select">
            <el-option v-for="item in options" :key="item.blockName" :label="item.block_name" :value="item.block_name">
            </el-option>
          </el-select>
        </div>
        <div class="timer">
          <span>时间:</span>
          <el-date-picker size="mini" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" v-model="time" type="datetimerange"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="second">
        <div class="source">
          <span>来源:</span>
          <el-input v-model="formData.source" placeholder="请输入查询来源" class="input" size="mini"></el-input>
        </div>
        <div class="label">
          <span>标签:</span>
          <el-input v-model="formData.tag" placeholder="请输入查询标签" class="input" size="mini"></el-input>
        </div>
        <el-button type="primary" size="mini" @click="find" class="btn">查询</el-button>
        <export-file></export-file>
      </div>
    </div>
    <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark"
      @selection-change="handleSelectionChange" @select="change" @select-all="change" id="#out-table">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="title_img" label="头图" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.title_img" class="img-item">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="source" label="来源">
      </el-table-column>
      <el-table-column prop="pubDate" label="时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row.id)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button :disabled="id.length==0?true:false" @click="del(id)">批量删除</el-button>
      <el-pagination class="page" background layout="prev, pager, next" :total="count" :page-size="rows"
        :current-page.sync="pn" @current-change="getPn" :pager-count="7">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import exportFile from '../../components/export'
  export default {
    name: "newsList",
    components: {
      exportFile
    },
    data() {
      return {
        tableData: [], //表格数据
        id: [], //表格id
        options: [], //板块数据
        formData: {},
        rows: 15,
        pn: 1,
        count: 1,
        time: ""
        // formData: {
        //   blockName: "", //板块的选择
        //   time: "", //时间
        //   source: "", //来源
        //   tag: "" //标签
        // }
      };
    },
    methods: {
      //获取数据
      getData() {
        console.log(this.time);
        console.log(this.time.length);
        if (this.time.length > 0) {
          var data = {
            page: 1,
            ...this.formData,
            startTime: this.time[0],
            endTime: this.time[1]
          };
        } else {
          var data = {
            page: 1
          };
        }
        this.$axios.get("getNews", data).then(res => {
          if ((res.code = 200)) {
            this.tableData = res.data.newsInfoBeanList;
            this.count = res.data.total_record;
          }
        });
      },
      //获取下拉菜单列表
      getOptions() {
        var data = {
          page: 1
        };
        this.$axios.get("getCategoryList", data).then(res => {
          this.options = res.data.blockInfoList;
          console.log(res);
        });
      },
      //获取分页功能
      getPn(pn) {
        this.pn = pn;
        if (this.time.length > 0) {
          var data = {
            page: pn,
            ...this.formData,
            startTime: this.time[0],
            endTime: this.time[1]
          };
        } else {
          var data = {
            page: pn
          };
        }
        this.$axios.get("getNews", data).then(res => {
          if ((res.code = 200)) {
            this.tableData = res.data.newsInfoBeanList;
            window.scrollTo(0, 0);
          }
        });
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
      edit(id) {
        this.$router.push({
          path: "/news/update"
        });
      },
      find() {
        this.getData();
      }
    },
    created() {
      this.getData();
      this.getOptions();
    }
  };

</script>
<style lang="css" scoped>
  .img-item {
    max-height: 100px;
    width: 150px;
  }

  .find {
    width: 60%;
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

  .block,
  .source,
  .label {
    margin-right: 20px;
  }

  .btn {
    margin-right: 10px;
  }

</style>
