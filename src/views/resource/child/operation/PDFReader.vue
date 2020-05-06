<template>
  <div class="pdfreader pdf">
    <div class="mask" @click="remove"></div>
    <div class="container">
      <pdf :src="pdfUrl" v-for="i in numPages" :key="i" :page="i"/>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  data () {
    return {
      pdfUrl: '',
      numPages: 1
    }
  },
  props: {
    id: Number
  },
  mounted () {
    this.filePreview(this.id)
  },
  methods: {
    filePreview(id) {
      this.http.get(this.api.resInfo.preview, {id}).then( res => {
        let { code, data, msg } = res
        if(code == 1) {
          this.pdfUrl = this.baseUrl + data
          this.pdfTask(this.pdfUrl)
        } else {
          this.$message.error(msg)
          this.$emit('close')
        }
      })
    },
    pdfTask(pdfUrl){
      let _this = this
      let loadingTask = pdf.createLoadingTask(pdfUrl)
      loadingTask.then(pdf => {
        _this.pdfUrl = loadingTask
        _this.numPages = pdf.numPages
      }).catch((err) => {
        console.error('pdf加载失败')
      })
    },
    remove() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.pdfreader {
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .container{
    width: 1200px;
    height: 100vh;
    background: #ffffff;
    padding: 20px 50px;
    box-sizing: border-box;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1003;
    overflow-y: auto;
    span{
      display: block !important;
      margin-bottom: 30px !important;
	  }
  }
}
</style>