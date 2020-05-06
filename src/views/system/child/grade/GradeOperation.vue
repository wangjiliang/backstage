<template>
  <div class="container fixed">
    <div class="mask" @click="hide"></div>
    <el-form class="ruleForm center" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="年级" label-width="80px" prop="name" class="item">
        <el-input clearable v-model="ruleForm.name" placeholder="请输入年级"></el-input>
      </el-form-item>
      <el-form-item label="学段" label-width="80px" prop="periodId" class="item">
        <el-select v-model="ruleForm.periodId" placeholder="选择学段">
          <el-option v-for="item in period" :key="item.name" :label="item.name" :value="item.id"></el-option>
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
          { required: true, message: '年级不能为空', trigger: 'blur' }
        ],
        periodId: [
          { required: true, message: '请选择学段', trigger: 'blur' },
        ],
      },
      ruleForm: {
        
      },
      period: [ ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    //获取学段列表
    getList() {
      this.http.get(this.api.period.list).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.period.push(...data)
        } else {
          this.$message.error(msg)
        }
      })
    },
    //年级添加
    add() {
      this.http.post(this.api.grade.add, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("年级添加成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    //年级修改
    modify() {
      this.http.put(this.api.grade.update, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("年级修改成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
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