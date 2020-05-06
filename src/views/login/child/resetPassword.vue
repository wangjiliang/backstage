<template>
  <el-dialog title="重置密码" :visible.sync="visible" @close="$emit('update:show', false)" :show="show" class="DialogBox">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="user"><el-input v-model="ruleForm.user" autocomplete="off"></el-input></el-form-item>
      <el-form-item label="新密码" prop="password"><el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
	data() {
		let validateUser = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('用户名不能为空'));
			} else {
				callback();
			}
		};
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else {
				callback();
			}
		};
		return {
			visible: this.show,
			ruleForm: {
				user: '',
				password: ''
			},
			rules: {
				user: [{ validator: validateUser, trigger: 'blur' }],
				password: [{ validator: validatePass, trigger: 'blur' }]
			}
		};
  },
	methods: {
		submitForm(ruleForm) {
			this.$refs[ruleForm].validate(valid => {
				if (valid) {
          this.http.put(this.api.loginAdmin.reset, {
            name: this.ruleForm.user,
            pwd: this.ruleForm.password
          }).then( res => {
            console.log(res)
            let {code, msg} = res
            if(code == 1) {
              this.$message.success('密码重置成功')
					    this.$emit('update:show', false)
            } else {
              return this.$message.error(msg)
            }
          })
				} 
			});
		},
		resetForm(ruleForm) {
			this.$refs[ruleForm].resetFields();
		}
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		show() {
			this.visible = this.show;
		}
	}
};
</script>

<style scoped>
</style>
