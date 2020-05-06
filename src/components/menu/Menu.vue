<template>
  <div class="menu">
    <img class="logo" src="~assets/images/logo.png" alt="">
    <div class="main">
      <div class="menu-item" :class="{active: currentId == item.id}" v-for="item in menu" :key="item.id" @click="handleClick(item)">
        <img v-if="currentId == item.id" class="icon" :src="item.iconActive" alt="">
        <img v-else class="icon" :src="item.icon" alt="">
        <span>{{item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      currentId: 'home',
      menu: [
        {
          id: "home",
          text: '后台首页',
          icon: require('assets/images/menu/home.png'),
          iconActive : require('assets/images/menu/home_active.png')
        },
        {
          id: "resource",
          text: '资源管理',
          icon: require('assets/images/menu/time.png'),
          iconActive : require('assets/images/menu/time_active.png')
        },
        {
          id: "info",
          text: '资讯cms管理',
          icon: require('assets/images/menu/info.png'),
          iconActive : require('assets/images/menu/info_active.png')
        },
        {
          id: "system",
          text: '系统管理',
          icon: require('assets/images/menu/setting.png'),
          iconActive : require('assets/images/menu/setting_active.png')
        }
      ]
    }
  },
  mounted () {
    let id = sessionStorage.getItem("currentId")
    if(id) {
      this.currentId = id
    }
  },
  methods: {
    handleClick(item) {
      if(this.currentId == item.id) return ;     
      this.currentId = item.id
      sessionStorage.setItem("currentId",item.id)
      this.$router.push("/"+ item.id)
    }
  }

}
</script>

<style lang="scss" scoped>
  .menu{
    width: 297px;
    min-height: 100vh;
    background: #ffffff;
    text-align: center;
    .logo{
      margin-top: 48px;
      margin-bottom: 68px;
    }
    .main{
      .menu-item{
        width: 248px;
        height: 72px;
        font-size: 18px;
        color: #4F639A;
        margin: 10px auto;
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon{
          margin-left: 18px;
          margin-right: 36px;
        }
        &.active{
          color: #243054;
          border-radius: 10px;
          box-shadow:1px 14px 29px 0px rgba(138,97,250,0.19);
        }
      }
    }
  }
</style>