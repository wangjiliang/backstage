<template>
  <div class="container fixed">
    <div class="mask" @click="hide"></div>
    <el-form class="ruleForm center" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="学校" label-width="80px" prop="schoolId" class="item">
        <el-select v-model="ruleForm.schoolId" placeholder="选择学校">
          <el-option v-for="item in schools" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" label-width="80px" prop="name" class="item">
        <el-input clearable v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="80px" prop="roleId" class="item">
        <el-select v-model="ruleForm.roleId" placeholder="选择角色">
          <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" label-width="80px" prop="sex" class="item">
        <el-select v-model="ruleForm.sex" placeholder="选择性别" >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否老师" label-width="80px" class="item">
        <el-select v-model="ruleForm.isTeacher" placeholder="选择是否老师" >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否名师" label-width="80px" class="item">
        <el-select v-model="ruleForm.isRenowned" placeholder="选择是否名师" >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介" label-width="80px" class="item">
        <el-input type="textarea" clearable v-model="ruleForm.intro" placeholder="简介"></el-input>
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
    let validateName = (rule, value, callback) => {

    }
    return {
      rules: {
        name: [
          { required: true, message: '角色不能为空', trigger: 'blur' },
          { max: 16, message: '用户名长度不能超过16位', trigger: 'blur' },
          { pattern: /^[a-z0-9A-Z]+$/, message: '用户名不能包含中文', trigger: "blur"}
        ],
        schoolId: [
          { required: true, message: '请选择学校', trigger: ['blur', 'change'] }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: ['blur', 'change'] }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ]
      },
      ruleForm: {
        schoolId: '',
        name: '',
        roleId: '',
        sex: '',
        isTeacher: '',
        isRenowned: '', //是否名师
        intro: '' //简介
      },
      schools: [],
      roles: []
    }
  },
  mounted () {
    this.getSchoolList()
    this.getRoleList()
  },
  methods: {
    //获取学校列表
    getSchoolList() {
      this.http.get(this.api.user.school).then( res => {
        let {code, data, msg } = res
        if(code == 1) {
          this.schools = data
        } else {
          this.$message.error("学校列表获取失败")
        }
      })
    },
    //获取角色列表
    getRoleList() {
      this.http.get(this.api.role.listAll).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.roles = data
        } else {
          this.$message.error("角色列表获取失败")
        }
      })
    },
    modify() {
      this.http.put(this.api.user.update, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("角色修改成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    add() {
      this.http.post(this.api.user.add, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("角色添加成功")
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
    .el-textarea {
      width: 280px;
    }
    &.buttons {
      justify-content: flex-end;
    }
  }
}
</style>