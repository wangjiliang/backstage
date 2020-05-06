<template>
  <div>
    <el-table class="tableData"  ref="multipleTable" highlight-current-row :data="tableData"
      :cell-class-name="fontColor" height="550" @row-click="rowClick"
      tooltip-effect="dark" @selection-change="handleSelectionChange" >
      <el-table-column align="center" type="selection" width="65"></el-table-column>
      <el-table-column prop="title" label="资源信息" width="360" show-overflow-tooltip></el-table-column>
      <el-table-column prop="format" label="媒体类型" align="center" width="80"></el-table-column>
      <el-table-column prop="userName" label="上传人" width="142"></el-table-column>
      <el-table-column prop="cityName" label="地区" width="100"></el-table-column>
      <el-table-column prop="editionShortName" label="版本" width="150"></el-table-column>
      <el-table-column prop="subjectName" label="学科" width="200"></el-table-column>
      <el-table-column prop="customTime" label="提交时间" align="center" width="100">
        <template slot-scope="scope">
          <span> {{formatDate(scope.row.createTime)}} </span>
        </template>
      </el-table-column>
      <el-table-column v-if="current == 'res'" align="center" prop="isAudit" label="审核状态" width="100">
        <template slot-scope="scope">
          <span> {{switchStatus(scope.row.isAudit)}} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="current == 'res'" size="mini" type="primary" @click.stop="handleModify(scope.row)">修改</el-button>
          <el-button v-if="current == 'audit'" size="mini" type="primary" @click="handleApprove(scope.row)">通过</el-button>
          <el-button v-if="current == 'audit'" size="mini" type="danger" @click="handleReject(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,15,20]"
      :page-size="pageSize"
      :page-count="5"
      layout="prev, pager, next, slot,jumper,sizes"
      prev-text="上一页" next-text="下一页"
      :total="total">
      <span>共{{ Math.ceil(total/pageSize) }}页，</span>
    </el-pagination>
  </div>
</template>

<script>
import dateFormat from '@/utils/dateformat.js'
export default {
  props:{
    current: String, 
    tableData: Array,
    currentPage: Number,
    pageSize: Number,
    total: Number
  },
  methods: {
    formatDate(stamp) {
      return dateFormat(stamp)
    },
    switchStatus(status) {
      switch (status) {
        case 0:
          return "待审核"
        case 1:
          return "已审核"
        case 2:
          return "审核成功"
        case 3:
          return "审核失败"
        default:
          break;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //点击行
    rowClick(row) {
      if(this.current == 'res') this.$emit('rowClick', row)
    },
    fontColor({columnIndex}) {
      switch (columnIndex) {
        case 1:
          return 'color19'
        case 7:
          return 'defaultColor'
      }
    },
    //修改
    handleModify(row) {
      this.$emit('handleModify',row)
    },
    //审核通过
    handleApprove(row) {
      this.$emit('handleApprove', row)
    },
    //审核拒绝
    handleReject(row) {
      this.$emit('handleReject', row)
    },
    //改变每页的条数
    handleSizeChange(val){
      this.$emit('handleSizeChange',val)
    },
    //翻页
    handleCurrentChange(val){
      this.$emit('handleCurrentChange',val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/datatable.scss';
</style>