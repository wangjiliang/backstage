<template>
  <div>
    <el-table class="tableData"  ref="multipleTable" highlight-current-row :data="tableData"
      height="550"
      tooltip-effect="dark" @selection-change="handleSelectionChange" >
      <el-table-column align="center" type="selection" width="65"></el-table-column>
      <el-table-column prop="name" label="学段" show-overflow-tooltip></el-table-column>
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
     <Operation v-if="showModal || isAdd" :row="row" @hide="hide" @confirm="handleConfirm"/>
  </div>
</template>

<script>
import { getData, operation } from '@/components/mixins/mixin.js'
import Operation from './Operation'

export default {
  mixins: [getData, operation],
  components: {
    Operation
  },
  
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData(pageNum, pageSize) {
      this.http.get(this.api.period.listAll, {pageNum, pageSize}).then( res => {
        let { code, data:{list, total, pageNum}, msg } = res
        if(code == 1) {
          this.tableData = list
          this.total = total
          this.currentPage = pageNum
          this.setStorage()
        } else {
          this.$message.error(msg)
        }
      })
    },
    //修改或添加学段后重新保存
    setStorage() {
      this.http.get(this.api.period.list).then( res => {
        let { code, data } = res
        if(code == 1) {
          let period = data
          sessionStorage.setItem('period', JSON.stringify(period) )
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/datatable.scss';

</style>