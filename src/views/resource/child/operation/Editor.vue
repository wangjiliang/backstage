<template>
  <div class="editor fixed">
    <div class="mask" @click="remove"></div>
    <el-form class="ruleForm center" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="标题" label-width="80px">
        <el-input clearable v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="学段" label-width="80px" >
        <el-select v-model="ruleForm.periodId" placeholder="选择学段" @change="changePeriod">
          <el-option v-for="item in period" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科" label-width="80px" >
        <el-select v-model="ruleForm.subjectId" placeholder="选择学科" @change="changeSubject">
          <el-option v-for="item in subject" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本" label-width="80px" >
        <el-select v-model="ruleForm.editionId" placeholder="选择版本" @change="changeEdition">
          <el-option v-for="item in versions" :key="item.id" :label="item.shortName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级" label-width="80px" >
        <el-select v-model="ruleForm.gradeId" placeholder="选择年级" @change="changeGrade">
          <el-option v-for="item in grade" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科目录" label-width="80px" >
        <el-select v-model="ruleForm.subjectContentId" placeholder="选择学科目录">
          <el-option v-for="item in subCategory" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信息分类" label-width="80px" >
        <el-select v-model="ruleForm.categoryId" placeholder="选择信息分类">
          <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button @click="remove" >取消</el-button>
        <el-button @click="handleConfirm('ruleForm')" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formdata: Object
  },
  data () {
    return {
      rules:{},
      ruleForm: {

      },
      period: [],
      subject: [],
      versions: [],
      grade: [],
      subCategory: [],
      category: [],
    }
  },
  created () {
    this.ruleForm = this.formdata
    this.getPeriod()
    this.getResCate()
    this.getSubject(this.formdata.periodId)
    this.getEditions(this.formdata.subjectId)
  },
  mounted () {
    this.getSubjectCategory(this.formdata.subjectId, this.formdata.editionId, this.formdata.gradeId)
    this.getGrade(this.formdata.gradeIds)
  },
  methods: {
    
    //获取学段
    getPeriod() {
      this.http.get(this.api.period.list).then( res => {
        let {code, data, msg } = res
        if(code == 1) {
          this.period = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    //学段改变
    changePeriod() {
      this.getSubject(this.ruleForm.periodId, true)
    },
    //获取学科
    getSubject(periodId, change) {
      this.http.get(this.api.subject.query, { periodId }).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.subject = data
          if(change) {
            this.ruleForm.subjectId = data[0].id
            this.getEditions(this.ruleForm.subjectId, true)
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    //学科改变
    changeSubject() {
      this.getEditions(this.ruleForm.subjectId, true)
    },
    //通过学科获取版本
    getEditions(subjectId, change) {
      this.http.get(this.api.edition.listall, { subjectId }).then ( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.versions = data
          if(change) {
            this.ruleForm.editionId = data[0].id
            let gradeIds = this.getGradeIds(this.ruleForm.editionId)
            this.getGrade(gradeIds, true)
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    //版本改变
    changeEdition() {
      let gradeIds = this.getGradeIds(this.ruleForm.editionId)
      this.getGrade(gradeIds, true)
    },
    getGradeIds(editionId) {
      let index = this.versions.findIndex( item => {
         return editionId == item.id
      })
      if(index > -1) {
        return this.versions[index].gradeIds
      }
    },
    //获取年级
    getGrade( gradeIds, change) {
      this.http.get(this.api.grade.listfor, { gradeIds }).then ( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.grade = data
          if(change) {
            this.ruleForm.gradeId = data[0].id
            this.getSubjectCategory(this.ruleForm.subjectId, this.ruleForm.editionId, this.ruleForm.gradeId, true)
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    //年级改变
    changeGrade() {
      this.getSubjectCategory(this.ruleForm.subjectId, this.ruleForm.editionId, this.ruleForm.gradeId, true)
    },
    //获取学科目录
    getSubjectCategory(subjectId, editionId, gradeId, change) {
      this.http.get(this.api.subjectContent.list, { subjectId, editionId, gradeId }).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.subCategory = data
          if(change) {
            if(data.length > 0) {
              this.ruleForm.subjectContentId = data[0].id
            } else {
              this.ruleForm.subjectContentId = 0
              this.subCategory = [{id: 0, name: "无"}]
            }
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    //获取资源信息分类列表
    getResCate() {
      this.http.get(this.api.resCat.list).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.category = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    //还原审核状态
    restoreStatus(status) {
      switch (status) {
        case "待审核":
          return 0
        case "已审核":
          return 1
        case "审核成功":
          return 2
        case "审核失败":
          return 3
        default:
          break;
      }
    },
    handleConfirm() {
      let params = Object.assign({},this.ruleForm)
      params.isAudit = this.restoreStatus(params.isAudit)
      this.http.put(this.api.resInfo.update, params).then( res => {
        let { code, data, msg} = res
        if(code == 1) {
          this.$message.success("修改成功!")
          this.$emit("confirm")
        } else {
          this.$message.error(msg)
        }
      })
    },

    remove() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.editor{
  .ruleForm{
    width: 600px;
    background: #ffffff;
    border-radius: 10px;
    padding: 30px 50px;
    box-sizing: border-box;
    .buttons{
      text-align: right;
    }
  }
}
</style>