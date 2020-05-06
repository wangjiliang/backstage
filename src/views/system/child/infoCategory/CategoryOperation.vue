<template>
  <div class="container fixed">
    <div class="mask" @click="hide"></div>
    <el-form class="ruleForm center" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="分类名称" label-width="80px" prop="name" class="item">
        <el-input clearable v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="保存路径" label-width="80px" prop="filePath" class="item">
        <el-input clearable v-model="ruleForm.filePath" placeholder="请输入资讯保存路径"></el-input>
      </el-form-item>
      <el-form-item label="父级" label-width="80px" >
        <el-select v-model="ruleForm.parentId" placeholder="选择父级">
          <el-option :style="{paddingLeft: 20 + (item.level-1)*10 + 'px'}" v-for="item in parentId" :key="item.name" :label="item.name" :value="item.id"></el-option>
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
          { required: true, message: '资讯分类名称不能为空', trigger: 'blur' }
        ],
        filePath: [
          { required: true, message: '请输入资讯保存路径', trigger: 'blur' },
          { pattern: /^[a-zA-Z]+$/, message: '保存路径必须为英文', trigger: "blur"}
        ],
      },
      ruleForm: {
        
      },
      parentId: [
        {id: 0, name: "无"}
      ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    //获取资讯分类列表
    getList() {
      this.http.get(this.api.cms.list).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          data.map( item => {
            this.parentId.push(item)
            if( item.list.length > 0) {
              item.list.map( child => {
                this.parentId.push(child)
              })
            }
          })
        } else {
          this.$message.error(msg)
        }
      })
    },
    //资讯分类添加
    add() {
      this.http.post(this.api.cms.add, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("资讯分类添加成功")
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    //资讯分类修改
    modify() {
      this.http.put(this.api.cms.update, this.ruleForm).then( res => {
        let { code, msg } = res
        if(code == 1) {
          this.$message.success("资讯分类修改成功")
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