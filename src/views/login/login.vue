<template>
  <div class="login-container" :style="bgStyle">
    <div class="form-container">
      <img class="form-img" src="~assets/images/login/login-img.png" alt="">
      <div class="form">
        <h2>登录</h2>
        <div class="form-item">
          <input type="text" placeholder="输入您的账号" v-model="username" />
        </div>
        <div class="form-item">
          <input type="password" placeholder="输入您的密码" v-model="password" />
        </div>
        <div class="submit" @click="login">登录</div>
        <div class="reset" @click="resetPassword">忘记密码?</div>
      </div>
    </div>
    <reset-password :show.sync="show" />
  </div>
</template>

<script>
import ResetPassword from './child/resetPassword'

export default {
  components: {
    ResetPassword
  },
  data () {
    return {
      bgStyle: {
        backgroundImage: "url(" + require("assets/images/login/login-bg.png") + ") ",
        backgroundPosition: "0 0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      username: '',
      password: '',
      show: false
    }
  },
  created () {
    this.enterEvent()
  },
  methods: {
    //回车登录
    enterEvent() {
      document.onkeydown=e=>{
        let _key=window.event.keyCode;
        if(_key===13){
          this.login()
        }
      }
    },
    //登录
    login() {
      if( !this.username ) {
        this.$message.error("请输入账号")
        return
      }
      if( !this.password ) {
        this.$message.error("请输入密码")
        return
      }
      this.http.get(this.api.loginAdmin.login,{
        name: this.username,
        pwd: this.password
      }).then( res => {
        let { code, data, msg } = res
        if( code == 1) {
          let user = { id: data.id, name: data.name} 
          let str = JSON.stringify(user)
          sessionStorage.setItem('user', str)
          this.$router.push("/home")
        }else {
          this.$message.error(msg)
        }
      })
    },
    //重置密码
    resetPassword() {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>

.login-container {
  width: 100%;
  height: 100vh;
  .form-container{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .form-img{ margin-left: 10px; }
    .form {
      width:502px;
      height:513px;
      background: #ffffff;
      border-radius:13px;
      margin-right: 20px;
      h2{
        font-size: 30px;
        color: #111111;
        margin: 48px 0;
        text-align: center;
      }
      .form-item {
        width: 418px;
        margin: 20px auto;
        input{
          width: 100%;
          height: 50px;
          font-size: 14px;
          padding-left: 20px;
          box-sizing: border-box;
          border: 1px solid #d9d9d9;
        }
      }
      .submit {
        width: 418px;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        color: #ffffff;
        text-align: center;
        margin: 40px auto 27px;
        background: #0595F2;
        cursor: pointer;
      }
      .reset {
        font-size: 14px;
        color: #455CAA;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>