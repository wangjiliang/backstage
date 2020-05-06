<template>
  <div class="res content-box">
    <Search :current="current" @query="queryList" @clear="clearParams"/>
    <div class="types">
      <div class="type-item" :class="{on: current == item.type}" @click="changeType(item)" v-for="item in types" :key="item.type">
        {{item.text}}
      </div>
    </div>
    <div class="datatable">
      <DataTable :current="current" :total="total" :currentPage="currentPage" :tableData="tableData" :pageSize="pageSize"
        @rowClick="rowClick" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
        @handleModify="handleModify" @handleApprove="handleApprove" @handleReject="handleReject"
      />
    </div>
    <FileReader v-if="showReader" :id="id" @close="closeReader"/>
    <Editor v-if="showEditor" :formdata="formData" @close="closeEditor" @confirm="reloadData" />
  </div>
</template>

<script>

import Search from './child/search/Search'
import DataTable from './child/datatable/DataTable'
import Editor from './child/operation/Editor'
import FileReader from './child/operation/PDFReader'


export default {
  components: { Search, DataTable, Editor, FileReader },
  data () {
    return {
      current: 'res',
      types: [
        { type: "res", text: "资源列表"},
        { type: "audit", text: "审核列表"}
      ],
      currentPage: 1, //表格数据当前页码
      pageSize: 10, //表格每页的条数
      tableData: [],
      total: 0, //列表总条数
      query: null,
      showReader: false,
      id: null,
      showEditor: false,
      formData: null
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData(pageNum=1, pageSize=15, query=null) {
      let obj = null
      if(this.current == 'res') {
        obj = {pageNum, pageSize}
      } else {
        obj = {pageNum, pageSize, isAudit: 0}
      }
      let params = Object.assign(obj, query)
      this.http.get(this.api.resInfo.list, params).then( res => {
        if( res.code == 1){
          let {list, pageSize, pageNum, total} = res.data
          this.tableData = list
          this.total = total
          this.currentPage = pageNum
          this.pageSize = pageSize
        }else {
          this.$message.error(res.msg)
        }
      })
    },
    changeType(item) {
      if(this.current == item.type) return
      this.current = item.type
      this.query = null
      this.fetchData()
    },
    //条件查询
    queryList(val) {
      debugger
      let param = this.filterParams(val)
      if(JSON.stringify(param) == "{}") {
        this.fetchData()
      } else {
        if(param.startTime){
          let stamp = new Date(param.startTime).getTime()
          param.startTime = stamp
        }
        if(param.endTime){
          let stamp = new Date(param.endTime).getTime() + 24*60*60*1000
          param.endTime = stamp
        }
        this.query = param
        this.fetchData(1,this.pageSize, this.query)
      }
    },
    //清空查询条件
    clearParams() {
      this.query = null
    },
    filterParams(obj) {
      let newObj = {}
      for(let key in obj) {
        if(obj[key] || obj[key] === 0 ) newObj[key] = obj[key]
      }
      return newObj
    },
    //点击行
    rowClick(row) {
      this.id = row.id
      this.showReader = true
    },
    //关闭预览
    closeReader() {
      this.showReader = false
    },
    //修改
    handleModify(row) {
      this.showEditor = true
      this.formData = Object.assign({}, row)
    },
    //关闭修改
    closeEditor() {
      this.showEditor = false
    },
    reloadData() {
      this.showEditor = false
      this.fetchData(this.currentPage, this.pageSize, this.query)
    },
    //审核通过
    handleApprove(row) {
      this.http.get(this.api.resInfo.audit, {id:row.id,isAudit:2}).then( res => {
        let {code, msg} = res
        if(code == 1) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'success',
            customClass: 'centerMsg'
          });
          this.fetchData(this.currentPage, this.pageSize, this.query)
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error',
            customClass: 'centerMsg'
          });
        }
      })
    },
    //审核拒绝
    handleReject(row) {
      this.http.get(this.api.resInfo.audit, {id:row.id,isAudit:3}).then( res => {
        let {code, msg} = res
        if(code == 1) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'success',
            customClass: 'centerMsg'
          });
          this.fetchData(this.currentPage, this.pageSize, this.query)
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error',
            customClass: 'centerMsg'
          });
        }
      })   
    },
    //改变每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.fetchData(1, val, this.query)
    },
    //翻页
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(val, this.pageSize, this.query)
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';


</style>