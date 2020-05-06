<template>
  <div class="header">
    <div class="user">
      <img class="avator" :src="avatorUrl" alt="">
      <span class="name">{{user.name}}</span>
      <div class="loginout" @click="loginOUt">
        <img class="logout" src="~assets/images/home/logout.png" alt="">
        <span>注销</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      avatorUrl: require('assets/images/home/avator.png')
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      let storage = sessionStorage.getItem('user')
      if(storage) {
        let obj = JSON.parse(storage)
        this.user = obj
      }
    },
    //注销
    loginOUt() {
      this.http.get(this.api.loginAdmin.loginout).then( res => {
        let { code, msg} = res
        if(code == 1) {
          sessionStorage.clear()
          this.$router.push('/login')
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    width: calc( 100vw - 297px );
    height: 56px;
    position: fixed;
    top: 0;
    left: 297px;
    z-index: 999;
    background: #3FBDD4;
    .logout{
      width: 20px;
      height: 20px;
    }
    .user{
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .avator{
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      .name{
        font-size: 16px;
        color: #ffffff;
        margin: 0 26px 0 10px;
      }
      .arrow{
        width: 0;
        height:0;
        display:inline-block;
        border-left: 8px solid transparent;
        border-right:8px solid transparent;
        border-top:10px solid #ffffff;
        margin-right: 10px;
        transition: all ease-out .2s;
      }
      .loginout{
        display: flex;
        align-items: center;
        color: #ffffff;
        margin-right: 90px;
        cursor: pointer;
        span{ margin-left: 5px; font-size: 14px;}
      }
    }
  }
</style>