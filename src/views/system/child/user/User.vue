<template>
  <div>
    <el-table class="tableData"  ref="multipleTable" highlight-current-row :data="tableData"
      height="550"
      tooltip-effect="dark" @selection-change="handleSelectionChange" >
      <el-table-column align="center" type="selection" width="65"></el-table-column>
      <el-table-column prop="name" label="用户名" width="130"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100"></el-table-column>
      <el-table-column prop="intro" label="简介" width="400" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="100"></el-table-column>
      <el-table-column label="老师" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.isTeacher == 1 ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名师" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.isRenowned == 1 ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadCount" label="上传量" width="80" align="center"></el-table-column>
      <el-table-column prop="schoolName" label="学校"></el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="primary" @click="changeStatus(scope.row)">{{scope.row.isUsed == 1 ? "禁用" : "启用"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :page-count="5"
      layout="prev, pager, next, slot,jumper,sizes"
      prev-text="上一页" next-text="下一页"
      :total="total">
      <span>共{{ Math.ceil(total/pageSize) }}页，</span>
    </el-pagination>
    <UserOperation v-if="showModal || isAdd" :row="row" @hide="hide" @confirm="handleConfirm"/>
  </div>
</template>

<script>
import { getData, operation } from '@/components/mixins/mixin.js'

import UserOperation from './UserOperation'
export default {
  mixins: [getData, operation],
  components: { UserOperation },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData(pageNum, pageSize) {
      let params = {pageNum, pageSize}
      this.http.get(this.api.user.list, params).then( res => {
        let {code, data:{list, total, pageNum}, msg } = res
        if(code == 1) {
          this.tableData = list
          this.total = total
          this.currentPage = pageNum
        } else {
          this.$message.error(msg)
        }
      })
    },
    changeStatus(row) {
      let params = Object.assign({},row)
      if(params.isUsed == 1) {
        params.isUsed = 0
      } else {
        params.isUsed = 1
      }
      this.http.put(this.api.user.update, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.$message.success('修改成功')
          row.isUsed = params.isUsed
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/datatable.scss';
</style>