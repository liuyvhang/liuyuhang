<template>
  <div class="container">
    <div class="find">
      <div class="top">
        <el-input v-model="input" :placeholder="search" size="small" style="width:200px;" @keyup.enter.native="goSearch">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="goSearch"></i>
        </el-input>
        <el-button type="primary" size="small" class="add" @click="goAdd">新增资讯广告</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="margin-top:20px" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @select="change" @select-all="change" id="#out-table">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" :show-overflow-tooltip="true" label="ID">
      </el-table-column>
      <el-table-column prop="title" label="标题">
        <template slot-scope="scope">
          <span @click="edit(scope.row.id)" class="title">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="channel_id" :show-overflow-tooltip="true" label="频道">
      </el-table-column>
      <el-table-column prop="media_type" label="媒体类型">
        <template slot-scope="scope">
          <span v-if="scope.row.media_type==0">图片</span>
          <span v-if="scope.row.media_type==1">视频 </span>
          <span v-if="scope.row.media_type==2">文本</span>
        </template>
      </el-table-column>
      <el-table-column prop="advertisement_style" label="展示形式">
        <template slot-scope="scope">
          <span v-if="scope.row.advertisement_style==0">图文</span>
          <span v-if="scope.row.advertisement_style==1">浮窗</span>
          <span v-if="scope.row.advertisement_style==2">单图</span>
        </template>
      </el-table-column>
      <el-table-column label="广告图片">
        <template slot-scope="scope">
          <img :src="scope.row.original_pic" style="width:50px;height:50px">
        </template>
      </el-table-column>
      <el-table-column prop="display_position" :show-overflow-tooltip="true" label="展示位置">
      </el-table-column>
      <el-table-column prop="sort_val" label="排序值">
      </el-table-column>
      <el-table-column label="跳转类型">
        <template slot-scope="scope">
          <span v-if="scope.row.forward_type==0">资讯</span>
          <span v-if="scope.row.forward_type==1">社群首页</span>
          <span v-if="scope.row.forward_type==2">帖子</span>
          <span v-if="scope.row.forward_type==3">问答</span>
          <span v-if="scope.row.forward_type==4">活动</span>
          <span v-if="scope.row.forward_type==5">H5页面</span>
          <span v-if="scope.row.forward_type==6">京东</span>
          <span v-if="scope.row.forward_type==7">天猫</span>
        </template>
      </el-table-column>
      <el-table-column prop="target_identification" label="链接" :show-overflow-tooltip="true">
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
  name: "newsAdList",
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
      this.$axios.get("getAdNews", data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.ad_detail_list;
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
      this.$router.push("/news/adNews/add");
    },
    //删除功能
    del(val) {
      val = val.toString();
      this.$confirm("此操作将永久删除该广告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delAdNews", {
              ad_detail_ids: val
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
          path: "/news/adNews/edit",
          query: { id: val[0] }
        });
      } else {
        this.$router.push({ path: "/news/adNews/edit", query: { id: val } });
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
