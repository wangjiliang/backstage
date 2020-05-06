<template>
  <div class="table">
    <div class="list" v-if=" list">
      <span class="list-item" :class="{on: current == index}" v-for="(item,index) in list" :key="item.id" @click="changeItem(item,index)">
        {{item.name}} 
      </span>
    </div>
    <el-table class="tableData"  ref="multipleTable" highlight-current-row :data="tableData"
      :cell-class-name="fontColor" height="550"
      tooltip-effect="dark" @selection-change="handleSelectionChange" >
      <el-table-column align="center" type="selection" width="65"></el-table-column>
      <el-table-column prop="title" label="标题" width="350" show-overflow-tooltip></el-table-column>
      <el-table-column prop="link" label="链接" width="370" ></el-table-column>
      <el-table-column prop="userName" label="创建人" width="158" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="158"></el-table-column>
      <el-table-column prop="releaseTime" label="发布时间" width="158"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope" >
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" v-if="scope.row.isRelease == 0" type="primary" @click="handleRelease(scope.row)">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,15,20]"
      :page-size="pageSize"
      :page-count="10"
      layout="prev, pager, next, slot, jumper,sizes"
      prev-text="上一页" next-text="下一页"
      :total="total">
      <span>共{{Math.ceil(total/pageSize)}}页</span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props:{
    list: {
      type: Array,
      default: null
    },
    tableData: Array,
    currentPage: Number,
    pageSize: Number,
    total: Number
  },
  data () {
    return {
      current: 0
    }
  },
  methods: {
    changeItem(item, index) {
      this.current = index
      this.$emit("reset",item)
    },
    fontColor({columnIndex}) {
      switch (columnIndex) {
        case 1:
          return 'color19'
        case 7:
          return 'defaultColor'
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(row) {
      this.$emit('handleEdit',row)
    },
    handleRelease(row) {
      this.$emit('handleRelease',row)      
    },
    handleSizeChange(val){
      this.$emit('handleSizeChange',val)
    },
    handleCurrentChange(val){
      this.$emit('handleCurrentChange',val)
    }
  }
}
</script>

<style lang="scss" scoped>
.table{
  .list{
    width: 1522px;
    overflow: hidden;
    margin: 5px auto;
    .list-item{
      display: inline-block;
      padding: 8px 12px;
      margin: 5px;
      color: #191919;
      cursor: pointer;
      border-radius: 5px;
      &.on{
        background: #3FBDD4;
        color: #ffffff;
      }
    }
  }
  .tableData{
    width: 1522px;
    font-size: 14px;
    color: #5D6876;
    margin: 0 auto;
    border: 1px solid #EBEEF5;
    .el-button--mini{
      font-size: 14px;
      padding: 10px 22px;
    }
    .el-button--primary{
      background-color: #3FBDD4;
      border-color: #3FBDD4;
    }
    .el-button--danger{
      background-color: #FF3514;
      border-color: #FF3514;
    }
    .el-table-column--selection{
      border-left: 5px solid #3FBDD4;
    }
  }
  .el-pagination{
    font-size: 16px;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 25px;
  }
}
</style>