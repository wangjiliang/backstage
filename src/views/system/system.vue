<template>
  <div class="system content-box">
    <div class="types">
      <div class="type-item" :class="{on: current == item.type}" @click="changeType(item)" v-for="item in types" :key="item.type">
        {{item.text}}
      </div>
      <div class="button" @click="addItem">+ 添加</div>
    </div>
    <div class="datatable">
      <City v-if="current == 'city' " />
      <School :isShow="showModal" @hide="hideModal" v-else-if="current == 'school' " />
      <Period :isShow="showModal" @hide="hideModal" v-else-if="current == 'period' " />
      <Subject :isShow="showModal" @hide="hideModal" v-else-if="current == 'subject' " />
      <Grade :isShow="showModal" @hide="hideModal" v-else-if="current == 'grade' " />
      <Edition :isShow="showModal" @hide="hideModal" v-else-if="current == 'edition' " />
      <Role :isShow="showModal" @hide="hideModal" v-else-if="current == 'role' " />
      <Admin :isShow="showModal" @hide="hideModal" v-else-if="current == 'admin' " />
      <User :isShow="showModal" @hide="hideModal" v-else-if="current == 'user' " />
      <InfoCategory :isShow="showModal" @hide="hideModal" v-else-if="current == 'infocategory' "/>
      <SubCategory :isShow="showModal" @hide="hideModal" v-else-if="current == 'subcategory' "/>
    </div>
  </div>
</template>

<script>
import City from './child/city/City'
import School from './child/school/School'
import Period from './child/period/Period'
import Subject from './child/subject/Subject'
import Grade from './child/grade/Grade'
import Edition from './child/edition/Edition'
import Role from './child/role/Role'
import Admin from './child/admin/Admin'
import User from './child/user/User'
import InfoCategory from './child/infoCategory/InfoCategory'
import SubCategory from './child/subCategory/SubCategory'

export default {
  components: {
    City, School, Period, Subject, Grade, Edition, Role, Admin, SubCategory, InfoCategory, User
  },
  data () {
    return {
      current: 'school',
      showModal: false,
      types: [
        { type: "city", text: "城市管理"},
        { type: "school", text: "学校管理"},
        { type: "period", text: "学段管理"},
        { type: "subject", text: "学科管理"},
        { type: "subcategory", text: "学科目录"},
        { type: "grade", text: "年级管理"},
        { type: "edition", text: "版本管理"},
        { type: "role", text: "角色管理"},
        { type: "admin", text: "管理员管理"},
        { type: "user", text: "用户管理"},
        { type: "infocategory", text: "资讯信息分类"}
      ]
    }
  },
  mounted () {
    this.getPeriod()
  },
  methods: {
    changeType(item) {
      this.current = item.type
      this.showModal = false
    },
    //添加
    addItem() {
      this.showModal = true
    },
    //隐藏
    hideModal() {
      this.showModal = false
    },
    //获取学段
    getPeriod() {
      this.http.get(this.api.period.list).then( res => {
        let { code, data } = res
        if(code == 1) {
          let period = data
          sessionStorage.setItem('period', JSON.stringify(period) )
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.types{
  .button{
    width: 102px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #ffffff;
    background: #3fbdd4;
    box-shadow: 0px 6px 10px 0px rgba(0, 197, 195, 0.2);
    border-radius: 5px;
    cursor: pointer;
    float: right;
    margin-right: 50px;
  }
}

</style>