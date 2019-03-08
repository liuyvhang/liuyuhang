<template>
  <div>
    <div class="find">
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
        <el-date-picker
          v-model="date"
          @change="resetDate"
          size="small"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
        <el-button
          type="success"
          size="small"
          @click="goSearch"
        >搜索</el-button>
        <el-button
          type="primary"
          size="small"
          class="add"
          @click="goAdd"
        >新增直播</el-button>
      </div>
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
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="频道"
        prop="channel_name"
      >
      </el-table-column>
      <el-table-column
        label="比赛信息"
        width="400"
        align="center"
      >
        <template slot-scope="scope">
          <div
            @click="scope.row.match_status!=1 && edit(scope.row.id)"
            class="title"
          >
            <span>{{scope.row.left_name}}</span>
            <span style="display:block;width:50px;height:50px"> <img
                :src="scope.row.left_badge"
                style="width:100%;height:100%;border-radius:50%"
              /></span>
            <span>VS</span>
            <span style="display:block;width:50px;height:50px"> <img
                :src="scope.row.right_badge"
                style="width:100%;height:100%;border-radius:50%"
              /></span>
            <span>{{scope.row.right_name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="match_desc"
        label="赛事描述"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="start_date"
        label="开始时间"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="match_status"
        label="赛事状态"
        column-key="match_status"
        :filters="[{text: '未开始', value:0}, {text:'直播中', value:1}, {text:'已结束', value:2},{text:'延期',value:3}]"
        :filter-multiple="false"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.match_status === 0">未开始</span>
          <span v-if="scope.row.match_status === 1">直播中</span>
          <span v-if="scope.row.match_status === 2">已结束</span>
          <span v-if="scope.row.match_status === 3">延期</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="weight"
        column-key="weight"
        label="权重"
        :filters="[{text: 1, value:1}, {text:2, value:2}, {text:3, value:3}, {text:4, value:4},{text:5, value:5} ]"
        :filter-multiple="false"
      >
      </el-table-column>
      <el-table-column
        prop="release_status"
        label="状态"
        column-key="release_status"
        :filters="[{text: '已发布', value:0}, {text:'审核中', value:1}, {text:'已删除', value:2} ]"
        :filter-multiple="false"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.release_status === 0">已发布</span>
          <span v-if="scope.row.release_status === 1">审核中</span>
          <span v-if="scope.row.release_status === 2">已删除</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        prop="reg_date"
        label="创建时间"
      >
      </el-table-column> -->
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
        :disabled="id.length==0||id.length>1||status==1?true:false"
        @click="edit(id)"
        size="mini"
        type="primary"
      >编辑</el-button>
      <el-button
        :disabled="id.length==0||id.length>1?true:false"
        @click="preview(url)"
        size="mini"
        type="primary"
      >预览</el-button>
      <el-button
        :disabled="id.length==0?true:false"
        @click="putUp(id)"
        size="mini"
        type="primary"
      >发布</el-button>
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
      <el-dialog
        title="直播预览"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <videoPlayer
          :options="playerOptions"
          class="video"
          ref="videoPlayer"
          v-if="playerOptions.sources[0].src"
          @ready="playerReadied"
        ></videoPlayer>
        <!-- <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import "video.js/dist/video-js.css";
import "videojs-contrib-hls";
import { videoPlayer } from "vue-video-player";
export default {
  components: { videoPlayer },
  data() {
    return {
      tableData: [], //表格数据
      options: [],
      id: [], //表格id
      url: "",
      status: "",
      input: "",
      date: "",
      start_date: "",
      end_date: "",
      rows: 10,
      pn: 1,
      count: 1,
      allSelect: false, //是否全选
      search: this.$t("layout.search"),
      classify: [],
      label: [],
      dialogVisible: false,
      playerOptions: {
        // videojs and plugin options
        language: "zh-CN",
        sources: [
          {
            type: "application/x-mpegURL",
            src: ""
          }
        ],
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        poster: "", //视频头图地址
        preload: "auto",
        aspectRatio: "16:9",
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } }
      },
      pickerOptions2: {
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
    resetDate(val) {
      if (val) {
        this.start_date = val[0];
        this.end_date = val[1];
      } else {
        this.start_date = "";
        this.end_date = "";
      }
    },
    //获取数据
    getData() {
      var data = {
        page: this.pn,
        keyword: this.input,
        end_date: this.end_date,
        start_date: this.start_date
      };
      this.$axios.get("getLive", data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.match_list;
          var arr = [];
          this.tableData.map((item, index) => {
            arr = this.options.filter(val => {
              return val.id == item.channel_id;
            });
            this.$set(
              this.tableData[index],
              "channel_name",
              arr[0].channel_name
            );
          });
          this.count = res.data.total_record;
        }
      });
    },
    getOptions() {
      this.$axios.get("getChannel", { page: 1 }).then(res => {
        if (res.code == 200) {
          this.options = res.data.channel_list;
          this.getData();
        }
      });
    },
    //全选功能
    toggleSelect(rows) {
      this.id = [];
      this.url = "";
      this.status = "";
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, !this.allSelect);
          this.id.push(row.id);
          this.url = row.source_url;
          this.status = row.match_status;
        });
        this.allSelect = !this.allSelect;
      }
      if (!this.allSelect) {
        this.id = [];
        this.url = "";
        this.status = "";
      }
    },
    //获取id
    change(selection, row) {
      this.id = [];
      this.url = "";
      if (selection.length > 0) {
        for (var i = 0; i < selection.length; i++) {
          this.id[i] = selection[i].id;
          this.url = selection[i].source_url;
          this.status = selection[i].match_status;
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
      this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
    },
    //新增功能
    goAdd() {
      this.$router.push("/video/video/add");
    },
    //删除功能
    del(val) {
      val = val.toString();
      this.$confirm("此操作将永久删除该赛事直播, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delLive", {
              match_ids: val
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
        this.$router.push({ path: "/video/video/edit", query: { id: val[0] } });
      } else {
        this.$router.push({ path: "/video/video/edit", query: { id: val } });
      }
    },
    //预览
    preview(url) {
      console.log(url);
      this.dialogVisible = true;
      this.playerOptions.sources[0].src = url;
    },
    handleClose(done) {
      done();
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.player.reset();
      }
      this.playerOptions.sources[0].src = "";
    },
    //搜索
    goSearch() {
      this.pn = 1;
      this.getData();
    },
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
    // },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log("example player 1 readied", player);
      player.currentTime(10);
      // console.log('example 01: the player is readied', player)
    }
  },
  mounted() {
    this.getOptions();
    // this.getData();
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
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
  display: flex;
  justify-content: center;
  align-items: center;
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
