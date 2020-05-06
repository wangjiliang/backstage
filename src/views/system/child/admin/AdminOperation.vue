<template>
  <div class="container fixed">
    <div class="mask" @click="hide"></div>
    <el-form class="ruleForm center" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="用户名" label-width="80px" prop="name" class="item">
        <el-input clearable v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item :label="row ? '新密码' : '密码' " label-width="80px" prop="pwd" class="item">
        <el-input type="password" clearable v-model="ruleForm.pwd" placeholder="请输入密码"></el-input>
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
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { pattern: /^\w+$/, message: '用户名不能包含汉字,', trigger: "blur"}
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\w{6,}$/, message: '请输入至少6位数的密码,', trigger: "blur"}
        ],
      },
      ruleForm: {
        name: '',
        pwd: ''
      }
    }
  },
  mounted () {
    if(this.row) this.ruleForm.pwd = ''
  },
  methods: {
    modify() {
      this.http.put(this.api.admin.update, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("用户修改成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    add() {
      this.http.post(this.api.admin.add, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("用户添加成功")
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