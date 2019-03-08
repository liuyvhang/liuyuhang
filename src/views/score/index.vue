<template>
    <div>
        <el-table :data="tableData" border style="width: 100%" @cell-click="cellClick">
            <el-table-column label="日期" width="180">
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name" v-if="scope.row.seen" @blur="loseFcous(scope.$index, scope.row)"> </el-input>
                    <span style="margin-left: 10px" v-else>{{ scope.row.name }}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          seen: false,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          seen: false,
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          seen: false,
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          seen: false,
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    loseFcous(index, row) {
      row.seen = false;
    },
    cellClick(row, column) {
      row.seen = true;
    }
  }
};
</script>

