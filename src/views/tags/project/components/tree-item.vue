<template>
  <div class="container-tree">
    <el-scrollbar
      wrap-class="list"
      view-class="view-box"
      :native="false"
    >
      <div class="slot-tree">
        <el-tree
          ref="SlotMenuList"
          class="expand-tree"
          v-if="isLoadingTree"
          node-key="id"
          highlight-current
          :data="setTree"
          :props="defaultProps"
          :expand-on-click-node="false"
          :default-expanded-keys="defaultExpandKeys"
          accordion
          :load="loadNode1"
          lazy
        >
          <span
            class="slot-t-node"
            slot-scope="{ node, data }"
          >
            <!-- 标签名 -->
            <span
              class="label"
              @click="handleNodeClick(node,data)"
            >{{node.label }}</span>
          </span>
        </el-tree>
      </div>
    </el-scrollbar>
    <div
      class="table"
      style="width:80%"
    >
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        type="card"
      >
        <el-tab-pane
          label="基本信息"
          name="first"
        >
          <el-card class="box-card loading">
            <div
              v-if="tagsData.id"
              class="content"
            >
              <div class="first">
                <span>标签名称：{{tagsData.label}}</span>
                <span>标签id：{{tagsData.id}}</span>
              </div>
              <div class="second">
                <div>
                  <label>推荐：</label>
                  <el-radio
                    disabled
                    v-model="tagsData.is_default_recommend"
                    :label="1"
                  >是</el-radio>
                  <el-radio
                    disabled
                    v-model="tagsData.is_default_recommend"
                    :label="0"
                  >否</el-radio>
                </div>
                <div>
                  <label>热门：</label>
                  <el-radio
                    disabled
                    v-model="tagsData.is_hot"
                    :label="1"
                  >是</el-radio>
                  <el-radio
                    disabled
                    v-model="tagsData.is_hot"
                    :label="0"
                  >否</el-radio>
                </div>
                <div>
                  <label>删除：</label>
                  <el-radio
                    disabled
                    v-model="tagsData.is_remove"
                    :label="1"
                  >是</el-radio>
                  <el-radio
                    disabled
                    v-model="tagsData.is_remove"
                    :label="0"
                  >否</el-radio>
                </div>
              </div>
              <div class="third">
                <span>标签描述：{{tagsData.label_desc}}</span>
                <span>标签等级：{{tagsData.label_level}}</span>
                <span>排序值：{{tagsData.sort_val}}</span>
              </div>
              <div class="handle">
                <add-node
                  @refresh="refresh"
                  class="add"
                  :editId="id"
                  :level="level"
                ></add-node>
                <edit-node
                  @refresh="refresh"
                  class="edit"
                  :editId="id"
                  v-if="this.level>0"
                ></edit-node>
                <del-node
                  @refresh="refresh"
                  :editId="id"
                  v-if="this.level>0"
                ></del-node>
              </div>
            </div>
            <div
              v-else
              style="text-align:center"
            >暂无数据</div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane
          label="标签关系"
          name="second"
        >
          <el-table
            :data="relationData"
            border
          >
            <el-table-column
              prop="sort_val"
              label="排序值"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="label"
              label="标签名"
            >
            </el-table-column>
            <el-table-column
              prop="relation_type"
              label="关系类型"
              :filters="[{text: 0, value: 0}, {text: 1, value: 1}]"
              :filter-method="filterType"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="editTop">
                  <edit-top
                    :editId="scope.row.id"
                    @refresh="refreshTable"
                    class="editButton"
                  ></edit-top>
                  <el-button
                    type="danger"
                    size="small"
                    @click="delSimilar(scope.row.id)"
                  >删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div
            style="margin-top: 20px "
            class="addtop "
          >
            <add-top
              :editId="id "
              @refresh="refreshTable "
            ></add-top>
            <el-pagination
              class="page "
              background
              layout="prev, pager, next "
              :total="similarCount "
              :page-size="rows "
              :current-page.sync="similarPn"
              @current-change="getSimilarPn"
              :pager-count="7"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="标签规则 "
          name="third "
        >
          <el-table
            :data="analysisData"
            border
          >
            <el-table-column
              prop="priority_level"
              label="优先级"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="expression"
              label="分析规则"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="editanalysis">
                  <edit-analysis
                    :editId="scope.row.id"
                    @refresh="refreshAnalysis"
                    class="editButton"
                  ></edit-analysis>
                  <el-button
                    type="danger"
                    size="small"
                    @click="delAnalysis(scope.row.id)"
                  >删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div
            style="margin-top: 20px "
            class="addanalysis "
          >
            <add-analysis
              :editId="id "
              @refresh="refreshAnalysis"
            ></add-analysis>
            <el-pagination
              class="page "
              background
              layout="prev, pager, next "
              :total="analysisCount "
              :page-size="rows "
              :current-page.sync="analysisPn "
              @current-change="getAnalysisPn "
              :pager-count="7 "
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import addNode from "./add";
import addTop from "./addTop";
import addAnalysis from "./addAnalysis";
import editNode from "./edit";
import editTop from "./editTop";
import editAnalysis from "./editAnalysis";
import delNode from "./del";
export default {
  name: "slot-tree",
  components: {
    addTop,
    addNode,
    addAnalysis,
    editNode,
    editTop,
    editAnalysis,
    delNode
  },
  data() {
    return {
      isLoadingTree: false, //是否加载节点树
      setTree: [], //节点树数据
      analysisData: [], //标签规则数据
      tagsData: {}, //基本信息数据
      relationData: [], //相似标签数据
      defaultProps: {
        label: "label"
      },
      defaultExpandKeys: [
        // "cbb9bffc02e040328e13a776c26da706",
        // "5bd2a40b365b411195ac0c46d9863205",
        // "6bfc6189742d46bb8611d1b5aa6af7c6"
      ], //默认展开节点列表
      activeName: "first", //默认选项卡第一项
      id: "", //传递给子组件的当前选中id
      level: "", //传递给子组件的当前选中level
      rows: 10,
      similarPn: 1,
      similarCount: 1,
      analysisPn: 1,
      analysisCount: 1
    };
  },
  methods: {
    //获取树
    getTree() {
      this.$axios.get("getChannel", { page: 1 }).then(res => {
        let data = res.data.channel_list;
        let setTree1 = [];
        data.map(item => {
          var tree = {
            channel_id: item.id,
            create_date: item.create_date,
            creater: "1",
            id: item.id,
            is_default_recommend: item.is_default,
            is_remove: item.is_remove,
            is_hot: 0,
            label: item.channel_name,
            label_desc: item.channel_desc,
            label_level: 0,
            parent_id: "",
            sort_val: item.sort_val,
            update_date: item.update_date
          };
          setTree1.push(tree);
        });
        this.setTree = setTree1;
      });
    },
    // 获取基本信息
    getTags(n, d) {
      if (n == 1) {
        this.$axios.get("infoChannel", { channel_id: d }).then(res => {
          if (res.code == 200) {
            let data = res.data.channel;
            var tree = {
              channel_id: data.id,
              create_date: data.create_date,
              creater: "1",
              id: data.id,
              is_default_recommend: data.is_default,
              is_remove: data.is_remove,
              is_hot: 0,
              label: data.channel_name,
              label_desc: data.channel_desc,
              label_level: 0,
              parent_id: "",
              sort_val: data.sort_val,
              update_date: data.update_date
            };
            this.tagsData = tree;
          }
        });
      }
      if (n > 1) {
        this.$axios.get("infoLabel", { label_id: d }).then(res => {
          this.tagsData = res.data.label;
        });
      }
    },
    //获取相似标签
    getTable() {
      this.$axios
        .get("getSimilar", { label_id: this.id, page: this.similarPn })
        .then(res => {
          if (res.code == 200) {
            this.relationData = res.data.label_similar_list;
            this.similarCount = res.data.total_record;
          }
        });
    },
    //获取标签规则
    getAnalysis() {
      this.$axios
        .get("getAnalysis", { label_id: this.id, page: this.analysisPn })
        .then(res => {
          if (res.code == 200) {
            this.analysisData = res.data.label_analysis_list;
            this.analysiscount = res.data.total_record;
          }
        });
    },
    //筛选类型
    filterType(value, row, column) {
      return row.relation_type === value;
    },
    //分页功能
    getSimilarPn(similarPn) {
      this.similarPn = similarPn;
      this.getTable();
    },
    getAnalysisPn(analysisPn) {
      this.analysisPn = analysisPn;
      this.getAnalysis();
    },
    //操作刷新
    refresh() {
      this.getTree();
      this.initExpand();
      this.tagsData = {};
    },
    refreshTable() {
      this.getTable();
      this.relationData = [];
    },
    refreshAnalysis() {
      this.getAnalysis();
      this.analysisData = [];
    },
    //懒加载
    loadNode1(node, resolve) {
      if (node.level === 0) {
        return resolve([]);
      }
      if (node.level === 1) {
        this.$axios
          .get("getLabel", { page: 0, channel_id: node.data.channel_id })
          .then(res => {
            return resolve(res.data.label_list);
          });
      }
      if (node.level > 1) {
        setTimeout(() => {
          this.$axios
            .get("getLabel", { page: 0, parent_id: node.data.id })
            .then(res => {
              return resolve(res.data.label_list);
            });
        }, 500);
      }
    },
    handleClick(tab, event) {},
    handleNodeClick(node, data) {
      this.id = data.id;
      this.level = data.label_level;
      this.defaultExpandKeys = [];
      this.handleArray(node);
      this.getTags(node.level, data.id);
      this.getTable(node.level, data.id);
      this.getAnalysis(node.level, data.id);
    },
    handleArray(obj) {
      if (obj.parent) {
        this.defaultExpandKeys.unshift(obj.data.id);
        this.handleArray(obj.parent);
      } else {
        return;
      }
    },
    delSimilar(id) {
      this.$confirm("是否删除此相似标签？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.get("delSimilar", { label_similar_ids: id }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "已成功删除"
              });
              this.refreshTable();
            } else {
              this.$message({
                type: "warning",
                message: "删除失败"
              });
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
    delAnalysis(id) {
      this.$confirm("是否删除此规则？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("delAnalysis", { label_analysis_ids: id })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "已成功删除"
                });
                this.refreshAnalysis();
              } else {
                this.$message({
                  type: "warning",
                  message: "删除失败"
                });
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
    initExpand() {
      //isLoadingTree用意也是在此
      this.isLoadingTree = true;
    }
  },
  mounted() {
    this.getTree();
    this.initExpand();
  }
};
</script>

<style>
.container-tree .el-scrollbar__wrap {
  overflow-x: auto !important;
}
.container-tree {
  height: 683px;
  overflow: hidden;
  display: flex;
}
.list {
  max-height: 683px;
}
.slot-tree {
  margin: 0 10px;
  width: 200px;
  max-width: 200px;
  overflow: auto;
  text-align: left;
  font-size: 12px;
}
.handle {
  display: flex;
}
.container-tree .add,
.container-tree .edit {
  margin-right: 10px;
}
.container-tree .editButton {
  margin-right: 10px;
}
/*节点*/
.slot-tree .slot-t-node--label {
  font-weight: 600;
}

.slot-tree .el-tree-node__content .label:hover {
  color: #409eff;
}
.slot-tree .el-tree-node__content {
  height: 30px;
}
.container-tree .addtop,
.container-tree .addanalysis,
.container-tree .editTop,
.container-tree .editanalysis {
  display: flex;
}
.container-tree .page {
  float: right;
}
</style>