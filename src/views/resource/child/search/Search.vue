<template>
  <div>
    <el-form class="search-form">
      <el-form-item label="学段" label-width="80px" class="item">
        <el-select v-model="ruleForm.periodId" placeholder="选择学段" @change="changePeriod">
          <el-option v-for="item in periods" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科" label-width="80px" class="item">
        <el-select v-model="ruleForm.subjectId" placeholder="选择学科" @change="changeSubject">
          <el-option v-for="item in subjects" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本" label-width="80px" class="item">
        <el-select v-model="ruleForm.editionId" placeholder="选择版本">
          <el-option v-for="item in editions" :key="item.id" :label="item.shortName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级" label-width="80px" class="item">
        <el-select v-model="ruleForm.gradeId" placeholder="选择年级" @change="changeGrade">
          <el-option v-for="item in grades" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科目录" label-width="80px" class="item">
        <el-select v-model="ruleForm.subjectContentId" placeholder="选择学科目录">
          <el-option v-for="item in subjectContents" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" label-width="80px" class="item">
        <el-input v-model="ruleForm.title" clearable placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="资源类型" label-width="80px" class="item">
        <el-select v-model="ruleForm.categoryId" placeholder="选择类型">
          <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" label-width="80px" class="item">
        <el-date-picker class="basic"  v-model="ruleForm.startTime" type="date" placeholder="请选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" label-width="80px" class="item">
        <el-date-picker class="basic"  v-model="ruleForm.endTime" type="date" placeholder="请选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item v-if="current == 'res'" label="审核状态" label-width="80px" class="item">
        <el-select v-model="ruleForm.isAudit" placeholder="选择类型">
          <el-option v-for="item in audits" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="item flex">
        <template>
          <div class="button" @click="queryList">查询</div>
          <div class="button" @click="clearAll">清空</div>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui'
export default {
  components: { "el-date-picker": DatePicker },
  props: {
    current: {
      type: String,
      default: 'res'
    }
  },
  data () {
    return {
      ruleForm: {},
      periods:[], //学段
      subjects: [], //学科
      editions: [], //版本
      grades: [], //年级
      subjectContents: [], //学科目录
      categories: [], //信息分类
      audits: [
        { name: "待审核", id: 0 },
        { name: "已审核", id: 1 },
        { name: "审核成功", id: 2 },
        { name: "审核失败", id: 3 },
      ]
    }
  },
  mounted () {
    this.getPeriods()
    this.getCategory()
  },
  methods: {
    //查询
    queryList() {
      this.$emit('query', this.ruleForm)
    },
    //清空
    clearAll() {
      this.ruleForm = {}
      this.$emit('clear')
    },
    //获取学段列表
    getPeriods() {
      this.http.get(this.api.period.list).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.periods = data
        }
      })
    },
    changePeriod() {
      this.getSubjects(this.ruleForm.periodId)
    },
    //获取学科列表
    getSubjects(periodId) {
      this.http.get(this.api.subject.query, { periodId }).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.subjects = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    //切换学科
    changeSubject() {
      this.getEditions(this.ruleForm.subjectId)
      this.getGrades(this.ruleForm.subjectId)
    },
    //获取版本列表
    getEditions(subjectId) {
      this.http.get(this.api.edition.listall, { subjectId }).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.editions = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    //获取年级列表
    getGrades(subjectId) {
      this.http.get( this.api.grade.listforsubject, { subjectId }).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.grades = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    //切换年级
    changeGrade() {
      this.getSubjectContents(this.ruleForm.periodId, this.ruleForm.subjectId, this.ruleForm.gradeId)
    },
    //获取学科目录列表
    getSubjectContents(periodId, subjectId, gradeId) {
      let params = { periodId, subjectId, gradeId }
      this.http.get(this.api.subjectContent.list, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.subjectContents = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    //获取资源类型
    getCategory() {
      this.http.get(this.api.resCat.list).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.categories = data
        }
      })
    }
    
  }
}
</script>

<style lang="scss" scoped>
.search-form{
  width: 1580px;
  font-size: 16px;
  color: #747474;
  background:rgba(255,255,255,1);
  box-shadow:0px 4px 16px 0px rgba(54,196,209,0.14);
  border-radius:10px;
  display:flex;
  align-items: center;
  margin-bottom: 16px;
  padding-right: 25px;
  padding-top: 12px;
  flex-wrap: wrap;
  box-sizing: border-box;
  .item {
    .el-select, .el-input {
      width: 178px !important;
    }
  }
  .flex{ margin-left: 20px; }
  .button{
    width: 80px;
    height: 36px;
    color: #ffffff;
    text-align: center;
    line-height: 36px;
    background: #3fbdd4;
    box-shadow: 0px 6px 10px 0px rgba(0, 197, 195, 0.2);
    border-radius: 5px;
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>