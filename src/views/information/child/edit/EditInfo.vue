<template>
  <div class="edit" >
    <div class="mask" @click="handleCancel"></div>
    <el-form class="container" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="标题" prop="title" class="form-item">
        <el-input class="base-input" clearable v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image" class="form-item w50 flex lf">
        <img class="placeholder" v-if="imgplace" :src="imgUrl" alt="" />
        <el-upload class="flex" list-type="picture-card" :limit="1" :action="uploadSrc" :on-success="handleSuccess" :on-remove="removeImg" v-model="ruleForm.image">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="链接" prop="link" class="form-item w50 lf">
        <el-input class="base-input" clearable v-model="ruleForm.link" placeholder="请输入链接"></el-input>
      </el-form-item>
      <el-form-item class="clear"></el-form-item>
      <el-form-item class="form-item linH" prop="content">
        <vue-ueditor-wrap ref="ueditor" v-model="ruleForm.content" :config="config"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item class="form-item" label="备注">
        <el-input type="textarea" v-model="ruleForm.remark" placeholder="添加备注"></el-input>
      </el-form-item>
      <el-form-item class="form-item buttons">
        <el-button @click="handleCancel" >取消</el-button>
        <el-button @click="handleConfirm('ruleForm')" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  components: {
    VueUeditorWrap
  },
  props: {
    categoryId: Number,
    infoId: Number,
    filePath: String
  },
  data () {
    
    let validateBody = (rule, value, callback) => {
      let body = this.ruleForm.content,
        image = this.ruleForm.image,
        link = this.ruleForm.link;
      if (body == '' && image == '' && link == '') {
        return callback(new Error('资源内容不能为空'));
      }else if (image !='' && link != '') {
        callback()
      }else if(body!=''){
        callback()
      }
    };
    let validateLink = (rule, value, callback) => {
      let body = this.ruleForm.content,
        image = this.ruleForm.image,
        link = this.ruleForm.link;
      if (body == '' && image == '' && link == '') {
        return callback(new Error('请输入链接地址'));
      } else if (image != '' && link =='') {
        return callback(new Error('请输入链接地址'));
      } else {
        callback()
      }
    };
    let validateImg = (rule, value, callback) => {
      let body = this.ruleForm.content,
        image = this.ruleForm.image,
        link = this.ruleForm.link;
      if (body == '' && image == '' && link == '') {
        return callback(new Error('请选择一张图片'));
      } else if (link != '' && image =='') {
        return callback(new Error('请选择一张图片'));
      } else {
        callback()
      }
    };
    return {
      isAdd: true,
      imgUrl: '',
      imgplace: false,
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        link: [
          { validator: validateLink, trigger: 'blur' }
        ],
        image: [
          { validator: validateImg, trigger: 'blur' }
        ],
        content: [
          { validator: validateBody, trigger: 'change' }
        ]
      },
      
      ruleForm: {
        title: '',
        link: '',
        content: '',
        remark: '',
        image: ''
      },
      config: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 300,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: this.baseUrl+'/ueditor/exec',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/back/UE/' //上线发布时使用的路径
        UEDITOR_HOME_URL: '/UE/' //本地开发时使用的路径
      },
      
    }
  },
  computed: {
    uploadSrc() {
      return  this.baseUrl + "/cmsInfo/upload?cmsCategoryFilePath=" + this.filePath
    }
  },
  mounted () {
    if( this.infoId) {
      this.isAdd = false
      this.getDetail(this.infoId)
    }
  },
  methods: {
    getDetail(id) {
      this.http.get(this.api.cmsInfo.get,{id}).then( res => {
        let {code, data } = res
        if(code == 1) {
          this.ruleForm.title = data.title
          this.ruleForm.link = data.link
          this.ruleForm.remark = data.remark
          this.ruleForm.content = data.body
          this.ruleForm.image = data.img
          if(data.img) {
            this.imgUrl = this.baseUrl + data.img
            this.imgplace = true
          }
        }
      })
    },
    //图片上传成功回调
    handleSuccess(res) {
      this.ruleForm.image = res.data
      this.imgUrl = '/api' + res.data
      this.imgplace = false
    },
    //移除图片
    removeImg() {
      this.ruleForm.image = ''
    },
    //添加资讯
    addInfo() {
      this.http.post(this.api.cmsInfo.add, {
        title: this.ruleForm.title,
        body: this.ruleForm.content,
        img: this.ruleForm.image,
        link: this.ruleForm.link,
        remark: this.ruleForm.remark,
        cmsCategoryId: this.categoryId
      }).then( res => {
        let { code, msg} = res
        if(code == 1) {
          this.$message.success('信息添加成功')
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    //修改资讯
    modifyInfo() {
      this.http.put(this.api.cmsInfo.update, {
        id: this.infoId,
        title: this.ruleForm.title,
        body: this.ruleForm.content,
        img: this.ruleForm.image,
        link: this.ruleForm.link,
        remark: this.ruleForm.remark,
        cmsCategoryId: this.categoryId
      }).then( res => {
        let { code, msg} = res
        if(code == 1) {
          this.$message.success('信息修改成功')
          this.$emit('confirm')
        } else {
          this.$message.error(msg)
        }
      })
    },
    //取消
    handleCancel() {
      this.$emit('cancel')
    },
    //确定
    handleConfirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
			  if(valid){
					if( this.isAdd ) {
            this.addInfo()
          } else {
            this.modifyInfo()
          }
				}
			});
    }
  }
}
</script>

<style lang="scss" scoped>

.placeholder{
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 8px;
}
.edit{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  .mask{
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
  }
  .clear{
    clear: both;
  }

  .container {
    width: 1000px;
    padding: 30px;
    overflow: hidden;
    box-sizing: border-box;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .form-item {
      font-size: 14px;
      margin: 12px 0;
      &.linH {
        margin-bottom: 30px;
      }
      &.buttons {
        text-align: center;
      }
      .el-upload{ margin-left: 12px; }
      .base-input{
        width: 400px;
      }
      .label{
        display: block;
        margin-bottom: 6px;
      }
    }
  }
}
</style>