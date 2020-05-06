<template>
  <div>
    <div class="list">
      <span class="list-item">学段:</span>
      <span class="list-item" :class="{on: current == item.id}" v-for="item in list" :key="item.id" @click="changeItem(item)">
        {{item.name}} 
      </span>
    </div>
    <el-divider></el-divider>
    <div class="list">
      <span class="list-item" style="float:left">学科:</span>
      <div style="float:left;width: 95%;">
        <span class="list-item" :class="{on: subjectId == item.id}" v-for="item in subject" :key="item.name" @click="changeSub(item)">
          {{item.name}} 
        </span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="list">
      <span class="list-item" style="float:left">版本:</span>
      <div style="float:left;width: 95%;">
        <span class="list-item" :class="{on: editionId == item.id}" v-for="item in edition" :key="item.name" @click="changeEdition(item)">
          {{item.shortName}} 
        </span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="list">
      <span class="list-item" style="float:left">年级:</span>
      <div style="float:left;width: 95%;">
        <span class="list-item" :class="{on: gradeId == item.id}" v-for="item in grade" :key="item.name" @click="changeGrade(item)">
          {{item.name}} 
        </span>
      </div>
    </div>
    <el-table class="tableData"  ref="multipleTable" highlight-current-row :data="tableData"
      height="493"
      tooltip-effect="dark" @selection-change="handleSelectionChange" >
      <el-table-column align="center" type="selection" width="65"></el-table-column>
      <el-table-column prop="name" label="学科目录" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.level !== 0" size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
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
    <SubCateOperation v-if="showModal || isAdd" :row="row" @hide="hide" @confirm="handleConfirm" />
  </div>
</template>

<script>
import { getData, period, operation } from '@/components/mixins/mixin.js'

import SubCateOperation from './SubCateOperation'

export default {
  mixins: [getData, period, operation],
  components: { SubCateOperation },
  data () {
    return {
      subject: [],
      subjectId: null,
      edition: [],
      editionId: null,
      gradeIds: null,
      grade: [],
      gradeId: null
    }
  },
  created () {
    this.getSubject()
  },
  
  methods: {
    fetchData(pageNum, pageSize) {
      let params = {
        pageNum,
        pageSize,
        subjectId: this.subjectId,
        editionId: this.editionId,
        gradeId: this.gradeId
      }
      this.http.get(this.api.subjectContent.listpage, params).then( res => {
        let { code, data:{list, total, pageNum}, msg } = res
        if(code == 1) {
          this.tableData = list
          this.total = total
          this.currentPage = pageNum
        } else {
          this.$message.error(msg)
        }
      })
    },
    //获取学科列表
    getSubject() {
      let params = {
        periodId: this.current
      }
      this.http.get(this.api.subject.query, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.subject = data
          if(data.length > 0) this.subjectId = data[0].id
          this.getEditions()
        } else {
          this.$message.error(msg)
        }
      })
    },
    //切换学段
    changeItem(item) {
      if(item.id == this.current) return
      this.current = item.id
      this.getSubject()
    },
    //切换学科
    changeSub(item) {
      if(this.subjectId == item.id) return
      this.subjectId = item.id
      this.getEditions()
    },
    //获取版本列表
    getEditions() {
      let params = {
        subjectId: this.subjectId
      }
      this.http.get(this.api.edition.listall, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.edition = data
          if(data.length > 0) {
            this.editionId = data[0].id
            this.gradeIds = data[0].gradeIds
            this.getGrades()
          } else {
            this.gradeIds = ''
            this.grade = []
            this.fetchData()
          }
        } else {
          this.$message.error("版本获取失败")
        }
      })
    },
    //切换版本
    changeEdition(item) {
      if(this.editionId == item.id) return
      this.editionId = item.id
      this.gradeIds = item.gradeIds
      this.getGrades()
    },
    //获取年级列表
    getGrades() {
      let params = {
        gradeIds : this.gradeIds
      }
      this.http.get(this.api.grade.listfor, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.grade = data 
          if(data.length > 0) this.gradeId = data[0].id
          this.fetchData()
        } else {
          this.$message.error("获取年级列表失败")
        }
      })
    },
    //切换年级
    changeGrade(item) {
      if(this.gradeId == item.id) return
      this.gradeId = item.id
      this.fetchData()
    }
  }
 
}
</script>

<style lang="scss" scoped>
@import 'assets/css/datatable.scss';
@import '../../style.scss';
</style>