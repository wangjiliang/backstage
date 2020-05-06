<template>
  <div>
    <el-table class="tableData"  ref="multipleTable" highlight-current-row :data="tableData"
      height="550"
      tooltip-effect="dark" @selection-change="handleSelectionChange" >
      <el-table-column align="center" type="selection" width="65"></el-table-column>
      <el-table-column prop="name" label="学校名称" width="280" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="地址" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" align="center" label="学段"></el-table-column>
      <el-table-column prop="phone" label="电话" ></el-table-column>
      <el-table-column prop="postcode" label="邮编" align="center" ></el-table-column>
      <el-table-column prop="uploadCount" label="资源上传次数"></el-table-column>
      <el-table-column align="center" label="操作" width="200" >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
    <Add v-if="showModal || isAdd" :id="id" @hide="hide" @confirm="handleConfirm"/>
  </div>
</template>

<script>
import { getData } from '@/components/mixins/mixin.js'

import Add from './SchoolAdd'
export default {
  components: { Add },
  mixins: [getData],
  data () {
    return {
      isAdd: false,
      id: null
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showModal() {
      return this.isShow
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData(pageNum, pageSize) {
      this.http.get(this.api.school.list, {pageNum, pageSize}).then( res => {
        let { code, data, msg} = res
        if(code == 1) {
          data.list.map( item => {
            if(item.isPrimary == 1 && item.isMiddle == 0 && item.isHigh == 0) {
              item.type = "小学"
            } else if(item.isMiddle == 1 && item.isPrimary == 0 && item.isHigh == 0) {
              item.type = "初中"
            } else if(item.isHigh == 1 && item.isPrimary == 0 && item.isMiddle == 0) {
              item.type = "高中"
            } else if(item.isPrimary == 1 && item.isMiddle == 1 && item.isHigh == 0) {
              item.type = "小学/初中"
            } else if(item.isPrimary == 1 && item.isMiddle == 1 && item.isHigh == 1) {
              item.type = "小学/初中/高中"
            } else if(item.isPrimary == 0 && item.isMiddle == 1 && item.isHigh == 1) {
              item.type = "初中/高中"
            }
          })
          this.tableData = data.list
          this.total = data.total
          this.pageSize = data.pageSize
          this.currentPage = data.pageNum
        } else {
          this.$message.error(msg)
        }
      })
    },
    handleEdit(index, row) {
      this.isAdd = true
      this.id = row.id
    },
    changeStatus(row) {
      let params = Object.assign({},row)
      if(params.isUsed == 1) {
        params.isUsed = 0
      } else {
        params.isUsed = 1
      }
      this.http.put(this.api.school.update, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          row.isUsed = params.isUsed
        } else {
          this.$message.error(msg)
        }
      })
    },
    hide() {
      this.$emit('hide')
      if(this.isAdd) this.isAdd = false
      if(this.id) this.id = null
    },
    handleConfirm() {
      this.fetchData()
      this.$emit('hide')
      if(this.isAdd) this.isAdd = false
      if(this.id) this.id = null
    }
  }

}
</script>

<style lang="scss" scoped>
@import 'assets/css/datatable.scss';
</style>