<template>
  <div class="container fixed">
    <div class="mask" @click="hide"></div>
    <el-form class="ruleForm center" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="学段名称" label-width="80px" prop="name" class="item">
        <el-input clearable v-model="ruleForm.name" placeholder="请输入学段"></el-input>
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
          { required: true, message: '学段名不能为空', trigger: 'blur' }
        ],
      },
      ruleForm: {
        name: ''
      }
    }
  },
  methods: {
    modify() {
      this.http.put(this.api.period.update, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("学段修改成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    add() {
      this.http.post(this.api.period.add, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("学段添加成功")
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