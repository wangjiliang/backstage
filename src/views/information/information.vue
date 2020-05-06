<template>
  <div class="info">
    <div class="search">
      <span class="time">日期</span>
      <el-date-picker class="basic"
        v-model="startTime"
        type="date"
        placeholder="请选择开始日期">
      </el-date-picker>
      <el-date-picker class="basic"
        v-model="endTime"
        type="date"
        placeholder="请选择结束日期">
      </el-date-picker>
      <span class="title">资讯标题</span>
      <el-input class="basic" v-model="title" clearable placeholder="请输入资讯标题"></el-input>
      <span class="status">发布状态</span>
      <el-select class="select" v-model="status" placeholder="选择发布状态">
        <el-option label="请选择" value=""></el-option>
        <el-option label="未发布" value="0"></el-option>
        <el-option label="已发布" value="1"></el-option>
      </el-select>
      <div class="button" @click="queryList">查询</div>
    </div>
    <div class="main">
      <div class="top">
        <div class="nav">
          <div class="nav-item" :class="{on: currentIndex == index}"  @click="changeNav(item, index)"
            v-for="(item, index) in navigation" :key="item.filePath"
          >
            {{item.name}}
          </div>
        </div>
        <div class="button" @click="showEdit">+ 添加</div>
      </div>
      <DataTable :list="list" :total="total" :currentPage="currentPage" :tableData="tableData" :pageSize="pageSize"
        @handleEdit="handleEdit" @handleRelease="handleRelease" @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange" @reset="resetData"
       />
    </div>
    <Edit v-if="isShow" :infoId="infoId" :filePath="filePath" :categoryId="categoryId" @cancel="cancelEvent" @confirm="confirmEvent"/>
  </div>
</template>

<script>
import DataTable from './child/datatable/DataTable'
import Edit from './child/edit/EditInfo'

import { DatePicker } from 'element-ui'

import dateFormat from '@/utils/dateformat.js'

export default {
  components: { DataTable, Edit, "el-date-picker": DatePicker },
  data () {
    return {
      isShow: false,
      infoId: null,
      navigation: [], //资讯分类列表
      categoryId: 0, //当前分类id
      currentIndex: 0,
      filePath: '', //分类path
      list:[], //二级导航
      startTime: null,
      endTime: null,
      title: null,
      status: null, //发布状态
      total: 32, //列表总条数
      currentPage: 1, //表格数据当前页码
      pageSize: 10, //表格每页的条数
      tableData: [],
      multipleSelection: [],
      searchParams: null
    }
  },
  mounted () {
    this.getCateList()
  },
  methods: {
    //查询
    queryList() {
      if(!this.startTime && !this.endTime && !this.title && !this.status) return this.$message.warning('请先选择查询条件')
      let start = null, end = null;
      if(this.startTime) start = new Date(this.startTime).getTime()
      if(this.endTime) end = new Date(this.endTime).getTime() + 24*60*60*1000
      this.searchParams = {
        startTime: start,
        endTime: end,
        title: this.title,
        isRelease: this.status
      }
      this.getCmsList(this.categoryId, 1, this.pageSize, this.searchParams)
    },
    //获取资讯信息分类列表
    getCateList() {
      this.http.get(this.api.cms.list).then( res => {
        let { code, data, msg} = res
        if(code == 1) {
          this.navigation = data
          this.list = data[0].list
          this.categoryId = data[0].id
          this.filePath = data[0].filePath
          this.getCmsList(this.categoryId, this.currentPage, this.pageSize)
        }
      })
    },
    //获取资讯信息列表
    getCmsList(id,pageNum,pageSize, query=null) {
      let obj = {
        cmsCategoryId: id,
        pageNum,
        pageSize        
      }
      let params = Object.assign(obj, query)
      this.http.get(this.api.cmsInfo.list,{...params}).then( res => {
        if(res.code == 1) {
          let { list, total} = res.data
          if(list.length > 0) {
            list.map(item => {
              item.createTime = dateFormat(item.createTime)
              if(item.releaseTime) {
                item.releaseTime = dateFormat(item.releaseTime)
              }
            })
            this.tableData = list
            this.total = total
          } else {
            this.tableData = list
            this.total = total
          }
        }else {
          this.$message.error(res.msg)
        }
      })
    },
    //切换栏目
    changeNav(item, index){
      this.list = item.list
      this.currentIndex = index
      this.categoryId = item.id
      this.filePath = item.filePath
      this.currentPage = 1
      if(this.searchParams) this.searchParams = null
      if(item.list.length > 0) {
        let id = item.list[0].id
        this.categoryId = id
        this.getCmsList(id, 1, 10)
      } else {
        this.getCmsList(item.id, 1, 10)
      }
    },
    resetData(val) {
      this.categoryId = val.id
      this.getCmsList(val.id, 1, 10)
    },
    //修改
    handleEdit(row) {
      this.infoId = row.id
      this.isShow = true
    },
    //发布
    handleRelease(row) {
      this.http.put(this.api.cmsInfo.release,{id:row.id}).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success('资讯发布成功')
          this.getCmsList(this.categoryId, this.currentPage, this.pageSize, this.searchParams)
        } else {
          this.$message.error(msg)
        }
      })
    },
    //改变每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getCmsList(this.categoryId, 1, val, this.searchParams)
    },
    //翻页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCmsList(this.categoryId, val, this.pageSize, this.searchParams)
    },
    //显示添加修改页面
    showEdit() {
      this.isShow = !this.isShow
      this.infoId = null
    },
    cancelEvent() {
      this.isShow = false
    },
    confirmEvent() {
      this.isShow = false
      this.getCmsList(this.categoryId, this.currentPage, this.pageSize, this.searchParams)
    }
  }
}
  
</script>

<style lang="scss" scoped>
  .info{
    margin: 16px;
    .search{
      width: 1580px;
      height:86px;
      font-size: 16px;
      color: #747474;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 16px 0px rgba(54,196,209,0.14);
      border-radius:10px;
      display:flex;
      align-items: center;
      margin-bottom: 16px;
      span{ margin-right: 10px; }
      .time{ margin-left: 22px; }
      .basic{ 
        width: 180px;
        height: 36px;
        margin-right: 16px;
      }
      .select{
        width: 141px;
        height: 36px;
        margin-right: 33px;
      }
      .button{
        width:80px;
        height:36px;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
        background:rgba(63,189,212,1);
        box-shadow:0px 6px 10px 0px rgba(0,197,195,0.2);
        border-radius:5px;
        cursor: pointer;
      }
    }
    .main{
      width:1580px;
      background: #ffffff;
      box-shadow:0px 0px 4px 0px rgba(160,170,199,0.13);
      border-radius:4px;
      padding-top: 30px;
      padding-bottom: 1px;
      .top{
        width: 1522px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .nav{
          overflow: hidden;
          .nav-item{
            float: left;
            width:114px;
            height:46px;
            color: #333333;
            font-size: 16px;
            text-align: center;
            line-height: 46px;
            margin-right: 8px;
            background:#F2F6FD;
            border-radius:2px 8px 0px 0px;
            cursor: pointer;
            &.on{
              background: #3FBDD4;
              color: #ffffff;
            }
          }
        }
        .button {
          width:102px;
          height:36px;
          line-height: 36px;
          text-align: center;
          color: #ffffff;
          background:rgba(63,189,212,1);
          box-shadow:0px 6px 10px 0px rgba(0,197,195,0.2);
          border-radius:5px;
          cursor: pointer;
        }
      }
    }
  }
</style>