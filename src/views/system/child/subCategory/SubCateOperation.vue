<template>
  <div class="container fixed">
    <div class="mask" @click="hide"></div>
    <el-form class="ruleForm center" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="学科目录名称" label-width="120px" prop="name" class="item">
        <el-input clearable v-model="ruleForm.name" placeholder="请输入版本名称"></el-input>
      </el-form-item>
      <el-form-item label="学段" label-width="120px" prop="periodId" class="item">
        <el-select v-model="ruleForm.periodId" placeholder="选择学段" @change="changePeriod">
          <el-option v-for="item in periods" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科" label-width="120px" prop="subjectId" class="item">
        <el-select v-model="ruleForm.subjectId" placeholder="选择学科" @change="changeSubject">
          <el-option v-for="item in subjects" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本" label-width="120px" prop="editionId" class="item">
        <el-select v-model="ruleForm.editionId" placeholder="选择版本" @change="changeEdition">
          <el-option v-for="item in editions" :key="item.id" :label="item.shortName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级" label-width="120px" prop="gradeId" class="item">
        <el-select v-model="ruleForm.gradeId" placeholder="选择年级" @change="changeGrade">
          <el-option v-for="item in grades" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科目录父级" label-width="120px" prop="parentId" class="item">
        <el-select v-model="ruleForm.parentId" placeholder="选择目录父级">
          <el-option :style="{paddingLeft: 20 + item.level*10 + 'px'}" v-for="item in parents" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="item buttons">
        <el-button @click="hide" >取消</el-button>
        <el-button @click="handleConfirm('ruleForm')" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { submit } from '@/components/mixins/mixin.js'
export default {
  mixins: [submit],
  data () {
    let validateSubject = (rule, value, callback) => {
      console.log(this.ruleForm)
        if (!this.ruleForm.periodId) {
          callback(new Error('请先选择学段'));
        } else {
          callback();
        }
    }
    return {
      rules: {
        name: [
          { required: true, message: '请输入学科目录名称', trigger: 'blur' }
        ],
        periodId: [
          { required: true, message: '请选择学段', trigger: ['blur','change'] }
        ],
        subjectId: [
          { required: true, message: '请选择学科', trigger: ['blur','change'] },
          { validator: validateSubject, trigger: ['blur','change','focus'] }
        ],
        editionId: [
          { required: true, message: '请选择版本', trigger: ['blur','change'] }
        ],
        gradeId: [
          { required: true, message: '请选择年级', trigger: ['blur','change'] }
        ],
        parentId: [
          { required: true, message: '请选择学科目录父级', trigger: ['blur','change'] }
        ]
      },
      ruleForm: {
        name: '',
        periodId: '',
        subjectId: '',
        editionId: '',
        gradeId: '',
        parentId: ''
      },
      periods: [],
      subjects: [],
      editions: [],
      grades: [],
      parents: []
    }
  },
  created () {
    this.getPeriods()
    if(this.row) {
      let obj = Object.assign({}, this.row)
      this.ruleForm = obj
      this.getSubjects()
    }
  },
  mounted () {
    if(this.row) {
      this.getGrades()
      this.getEditions()
      this.getSubjectContent()
    }
  },
  methods: {
    //获取学段列表
    getPeriods() {
      let storage = sessionStorage.getItem('period')
      this.periods = JSON.parse(storage)
    },
    changePeriod() {
      this.getSubjects()
      this.ruleForm.subjectId = ''
    },
    //获取学科列表
    getSubjects() {
      let params = {
        periodId: this.ruleForm.periodId
      }
      this.http.get(this.api.subject.query, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.subjects = data
        } else {
          this.$message.error("学科列表获取失败")
        }
      })
    },
    changeSubject() {
      this.getEditions()
      this.getGrades()
      this.ruleForm.editionId = ''
      this.ruleForm.gradeId = ''
    },
    //获取版本列表
    getEditions() {
      let params = {
        subjectId: this.ruleForm.subjectId
      }
      this.http.get(this.api.edition.listall, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.editions = data
        } else {
          this.$message.error("版本列表获取失败")
        }
      })
    },
    changeEdition() {
      this.ruleForm.parentId = ''
      this.getSubjectContent()
    },
    //获取年级列表
    getGrades() {
      let params = {
        subjectId: this.ruleForm.subjectId
      }
      this.http.get(this.api.grade.listforsubject, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.grades = data
        }
      })
    },
    changeGrade() {
      this.ruleForm.parentId = ''
      this.getSubjectContent()
    },
    getSubjectContent() {
      let params = {
        periodId: this.ruleForm.periodId,
        subjectId: this.ruleForm.subjectId,
        editionId: this.ruleForm.editionId,
        gradeId: this.ruleForm.gradeId
      }
      this.http.get(this.api.subjectContent.list, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.parents = data
        }
      })
    },
    //修改
    modify() {
      this.http.put(this.api.subjectContent.modify, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("学科目录修改成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    //添加
    add() {
      this.http.post(this.api.subjectContent.add, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("学科目录添加成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    
  }
}
</script>

<style lang="scss" scoped>
.ruleForm {
  width: 500px;
  .item {
    display:flex;
    align-items: center;
    &.buttons {
      justify-content: flex-end;
    }
  }
}
</style>