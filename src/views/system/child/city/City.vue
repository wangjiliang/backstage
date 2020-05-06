<template>
  <div>
    <el-table class="tableData"  ref="multipleTable" highlight-current-row :data="tableData"
      height="550"
      tooltip-effect="dark" @selection-change="handleSelectionChange" >
      <el-table-column align="center" type="selection" width="65"></el-table-column>
      <el-table-column prop="name" label="城市" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
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
  </div>
</template>

<script>
import { getData } from '@/components/mixins/mixin.js'

export default {
  mixins: [getData],
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData(pageNum, pageSize) {
      let params = {pageNum, pageSize}
      this.http.get(this.api.city.list, params).then( res => {
        let {code, data: {list, total, pageNum}, msg } = res
        if( code == 1) {
          this.tableData = list
          this.total = total
          // this.currentPage = pageNum
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