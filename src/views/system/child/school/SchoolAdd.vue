<template>
  <div class="container">
    <div class="mask" @click="hide"></div>
    <el-form class="ruleForm" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="学校名称" label-width="80px" prop="name" class="form-item">
        <el-input size="small" clearable v-model="ruleForm.name" placeholder="请输入学校名称"></el-input>
      </el-form-item>
      <el-form-item label="学校简介" label-width="80px" class="form-item">
        <el-input type="textarea" class="textarea" placeholder="请添加学校简介"  v-model="ruleForm.intro"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item label="是否分校" prop="isBranch" label-width="80px" class="form-item">
            <el-select class="small" v-model="ruleForm.isBranch" placeholder="是否分校" @change="changeBranch">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item v-if="ruleForm.isBranch == 1" label="主校" label-width="60px" class="form-item">
            <el-select v-model="ruleForm.parentId" placeholder="选择主校区">
              <el-option v-for="school in schoolList" :key="school.id" :label="school.name" :value="school.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否小学" label-width="80px" class="form-item">
            <el-select class="small" v-model="ruleForm.isPrimary" placeholder="是否小学">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否初中" label-width="80px" class="form-item">
            <el-select class="small" v-model="ruleForm.isMiddle" placeholder="是否初中">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否高中" label-width="80px" class="form-item">
            <el-select class="small" v-model="ruleForm.isHigh" placeholder="是否高中">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="所在城市" prop="cityId" label-width="80px"  class="form-item">
        <el-select v-model="ruleForm.cityId" placeholder="请选择">
          <el-option v-for="city in cityList" :key="city.name" :label="city.name" :value="city.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="校徽" label-width="80px" class="form-item flex">
        <img class="placeholder" v-if="imgplace" :src="imgUrl" alt="" />
        <el-upload class="flex" list-type="picture-card" :limit="1" :action="uploadSrc" :on-success="handleSuccess" :on-remove="removeImg" v-model="ruleForm.img">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="联系电话"  label-width="80px" class="form-item">
        <el-input class="base-input" size="small" clearable v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" label-width="80px" class="form-item">
        <el-input class="base-input" size="small" clearable v-model="ruleForm.postcode" placeholder="请输入邮政编码"></el-input>
      </el-form-item>
      <el-form-item label="学校地址" label-width="80px" class="form-item">
        <el-input class="base-input" size="small" clearable v-model="ruleForm.address" placeholder="请输入学校详细地址"></el-input>
      </el-form-item>
      <el-form-item class="form-item buttons">
        <el-button @click="hide" >取消</el-button>
        <el-button @click="handleConfirm('ruleForm')" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rules: {
        name: [
          { required: true, message: '学校名称不能为空', trigger: 'blur' }
        ],
        cityId: [
          { required: true, message: '请选择城市', trigger: 'blur' }
        ],
        period: [
          { required: true, message: '请选择学段', trigger: 'blur' }
        ],
        isBranch: [
          { required: true, message: '选择是否是分校', trigger: 'blur' }
        ]
       
      },
      ruleForm: {
        id:'',
        name: '',
        address: '',
        phone: '',
        postcode: '',
        img: '', //校徽
        isBranch: '0',//是否分校
        isPrimary: '0', //是否小学
        isMiddle: '0', //是否初中	
        isHigh: '0', //是否高中
        parentId: '', 
        cityId: '',
        intro: '',//简介
      },
      imgplace: false,
      imgUrl: '',
      cityList:[],
      schoolList: [],
      list: []
    }
  },
  props: {
    id: Number,
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    uploadSrc() {
      return  this.baseUrl + "/school/upload"
    }
  },
  mounted () {
    this.getCity()
    if(this.id) {
      this.getSchool()
      this.getDetail(this.id)
    }
  },
  methods: {
    getDetail(id) {
      this.http.get(this.api.school.detail, {id}).then( res => {
        let { data } = res
        if(data) {
          this.ruleForm.id = data.id
          this.ruleForm.name = data.name
          this.ruleForm.intro = data.intro
          this.ruleForm.address = data.address
          this.ruleForm.phone = data.phone
          this.ruleForm.postcode = data.postcode
          this.ruleForm.parentId = data.parentId + ''
          this.ruleForm.cityId = data.cityId
          this.ruleForm.isBranch = data.isBranch + ''
          this.ruleForm.img = data.img
          if(data.img) {
            this.imgUrl = this.baseUrl + data.img
            this.imgplace = true
          }
          this.ruleForm.isPrimary = data.isPrimary + ''
          this.ruleForm.isMiddle = data.isMiddle + ''
          this.ruleForm.isHigh = data.isHigh + ''
        }
      })
    },
    changeBranch() {
      if(this.ruleForm.isBranch == 1 && this.schoolList.length == 0) {
        this.getSchool()
      }
    },
    //获取城市列表
    getCity() {
      this.http.get(this.api.city.listAll).then( res => {
        let { code, data, msg} = res
        if(code == 1) {
          this.cityList = data
        } else {
          this.$message.error("城市列表获取失败")
        }
      })
    },
    //获取学校列表
    getSchool() {
      this.http.get(this.api.school.listAll).then( res => {
        let { code, data, msg} = res
        if(code == 1) {
          this.schoolList = data
        } else {
          this.$message.error("学校列表获取失败")
        }
      })
    },
    hide() {
      this.$emit('hide')
    },
    //图片上传成功回调
    handleSuccess(res) {
      this.ruleForm.img = res.data
      this.imgUrl = '/api' + res.data
      this.imgplace = false
    },
    //移除图片
    removeImg() {
      this.ruleForm.image = ''
    },
    handleConfirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
			  if(valid){
					if( this.id ) {
            this.modifySchool(this.ruleForm)
          } else {
            this.addSchool(this.ruleForm)
          }
				}
			});
    },
    //添加学校
    addSchool(params) {
      this.http.post(this.api.school.add, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.$emit("confirm")
        } else {
          this.$message.error(msg)
        }
      })
    },
    //修改学校
    modifySchool(params) {
      this.http.put(this.api.school.update, params).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.$emit("confirm")
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../common.scss';
.el-form-item.clear{
  margin-bottom: 0 !important;

}
.ruleForm {
  width: 600px;
  background: #fff;
  padding:50px;
  box-sizing: border-box;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  transform: translate(-50%,-50%);
  .form-item {
    display:flex;
    margin-bottom: 16px;
    align-items: center;
    .textarea{
      width: 320px;
    }
    .small{
      width: 60px;
    }
  }
}
</style>