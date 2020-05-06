<template>
  <div id="app">
    <Menu v-if="full" class="left" />
    <div class="right" :class="{fullscreen: full == false}">
      <Head v-if="full"/>
      <div v-if="full" style="height:56px;"></div>
      <div class="wrapper" :class="{fullscreen: full == false}">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from 'components/menu/Menu.vue'
import Head from 'components/header/header.vue'
export default {
  components: {
    Menu,
    Head
  },
  computed: {
    full() {
      return !this.$route.meta.show
    }
  }
}
</script>

<style lang="scss">
  #app{
    width: 100%;
    height: 100%; 
    .fullscreen{
      width: 100% !important;
      height: 100% !important;
    }   
    .left{
      position: fixed;
      left: 0;
      top: 0;
    }
    .right{
      position: absolute;
      left: 297px;
      top: 0;
      width: calc( 100vw - 297px );
      height: 100%;
      &.fullscreen{
        left: 0;
      }
      .wrapper{
        border-top: 1px solid transparent;
        height: calc( 100% - 72px);
        &.fullscreen{
          border: none;
        }
      }
    }
  }
</style>
