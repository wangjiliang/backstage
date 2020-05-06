<template>
  <div class="container fixed">
    <div class="mask" @click="hide"></div>
    <el-form class="ruleForm center" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="版本名称" label-width="80px" prop="name" class="item">
        <el-input clearable v-model="ruleForm.name" placeholder="请输入版本名称"></el-input>
      </el-form-item>
      <el-form-item label="版本简称" label-width="80px" prop="shortName" class="item">
        <el-input clearable v-model="ruleForm.shortName" placeholder="请输入版本简称"></el-input>
      </el-form-item>
      <el-form-item label="年级" label-width="80px" prop="gradeIds" class="item">
        <el-select v-model="ruleForm.gradeIds" multiple placeholder="选择年级">
          <el-option v-for="item in grades" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科" label-width="80px" prop="subjectId" class="item">
        <el-select v-model="ruleForm.subjectId" placeholder="选择学科">
          <el-option v-for="item in subjects" :key="item.name" :label="item.name" :value="item.id"></el-option>
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
    return {
      rules: {
        name: [
          { required: true, message: '请输入版本名称', trigger: 'blur' }
        ],
        shortName: [
          { required: true, message: '请输入版本简称', trigger: 'blur' }
        ],
        gradeIds: [
          { required: true, message: '选择年级', trigger: 'blur' }
        ],
        subjectId: [
          { required: true, message: '选择学科', trigger: 'blur' }
        ],
      },
      ruleForm: {
        name: '',
        shortName: '',
        gradeIds: [],
        subjectId: ''
      },
      grades: [],
      subjects: []
    }
  },
  created () {
    this.getGrades()
    this.getSubjects()
  },
  mounted () {
    this.transform()
  },
  methods: {
    //将列表中gradeIds字符串转换为数组
    transform() {
      if(this.ruleForm.gradeIds.length > 0) {
        let arr = this.ruleForm.gradeIds.split(",")
        let newArr = []
        arr.map( item => {
          newArr.push(parseInt(item))
        })
        this.ruleForm.gradeIds = newArr
      }
    },
    //获取年级列表
    getGrades() {
      this.http.get(this.api.grade.listAll).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.grades = data
        } else {
          this.$message.error("年级列表获取失败")
        }
      })
    },
    //获取学科列表
    getSubjects() {
      this.http.get(this.api.subject.query).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.subjects = data
        } else {
          this.$message.error("学科列表获取失败")
        }
      })
    },
    //修改
    modify() {
      this.transformGradeIds()
      this.http.put(this.api.edition.update, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("版本修改成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    //添加
    add() {
      this.transformGradeIds()
      this.http.post(this.api.edition.add, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("版本添加成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    //表单提交时将年级数组转换为字符串提交
    transformGradeIds() {
      let str = this.ruleForm.gradeIds.join()
      this.ruleForm.gradeIds = str
    }
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