<template>
  <div class="home">
    <div class="overview">
      <div class="item" v-for="item in overview" :key="item.id">
        <img :src="item.image" alt="">
        <div class="desc">
          <p class="num">{{item.count}}</p>
          <p class="title">{{item.text}}</p>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="item" :class="{on: current == idx}"
       v-for="(item, idx) in modules" :key="idx"
       @click="changeModule(idx)"
      >
        <img v-if="current == idx" :src="item.icon" alt="">
        <img v-else :src="item.iconOn" alt="">
        <div class="name">{{item.text}}</div>
      </div>
    </div>
    <div class="charts">
      <div class="chart-left">
        <p class="chart-title">示例图</p>
        <div class="chart-line" id="line"></div>
      </div>
      <div class="chart-right">
        <p class="chart-title">示例图</p>
        <div class="chart-radar" id="radar"></div>
      </div>
    </div>
  </div>
</template>

<script>

 // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/line')
  // 引入雷达图组件
  require("echarts/lib/chart/radar")
  // 引入提示框和图例组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
export default {
  name: 'home',
  data () {
    return {
      overview: [
        {
          id:"001",
          count: 13246,
          text: "资源汇总信息",
          image: require('assets/images/home/item.png')
        },
        {
          id:"002",
          count: 13246,
          text: "系统运行信息",
          image: require('assets/images/home/item1.png')
        },
        {
          id:"003",
          count: 13246,
          text: "系统汇总信息",
          image: require('assets/images/home/item2.png')
        },
        {
          id:"004",
          count: 13246,
          text: "系统汇总信息",
          image: require('assets/images/home/item3.png')
        }
      ],
      modules: [
        {
          text: "预留模块",
          icon: require('assets/images/home/person.png'),
          iconOn: require('assets/images/home/person-on.png'),
        },
        {
          text: "预留模块",
          icon: require('assets/images/home/position.png'),
          iconOn: require('assets/images/home/position-on.png'),
        },
        {
          text: "预留模块",
          icon: require('assets/images/home/hotel.png'),
          iconOn: require('assets/images/home/hotel-on.png'),
        },
        {
          text: "预留模块",
          icon: require('assets/images/home/movie.png'),
          iconOn: require('assets/images/home/movie-on.png'),
        },
        {
          text: "预留模块",
          icon: require('assets/images/home/recruitment.png'),
          iconOn: require('assets/images/home/recruitment-red.png'),
        },
        {
          text: "预留模块",
          icon: require('assets/images/home/KTV.png'),
          iconOn: require('assets/images/home/KTV-on.png'),
        },
        {
          text: "预留模块",
          icon: require('assets/images/home/recruitment.png'),
          iconOn: require('assets/images/home/recruitment-green.png'),
        },
      ],
      current: 1
    }
  },
  mounted () {
    this.initChartLine()
    this.initChartRadar()
  },
  methods: {

    changeModule(index) {
      this.current = index
    },
    initChartLine() {
      let chartLine = echarts.init(document.getElementById("line"))
      let option = {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
          }]
      };
      chartLine.setOption(option)
    },
    initChartRadar() {
      let charts = echarts.init(document.getElementById('radar'))
      let option = {
        title: {
          text: '基础雷达图'
        },
        tooltip: {},
        legend: {
          data: ['预算分配', '实际开销']
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '销售', max: 6500},
            { name: '管理', max: 16000},
            { name: '信息技术', max: 30000},
            { name: '客服', max: 38000},
            { name: '研发', max: 52000},
            { name: '市场', max: 25000}
          ]
        },
        series: [{
          name: '预算vs开销',
          type: 'radar',
          // areaStyle: {normal: {}},
          data : [
            {
              value : [4300, 10000, 28000, 35000, 50000, 19000],
              name : '预算分配'
            },
            {
              value : [5000, 14000, 28000, 31000, 42000, 21000],
              name : '实际开销'
            }
          ]
        }]
      };
      charts.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    height: 100%;
    padding: 25px 53px 0 29px;
    box-sizing: border-box;
    .overview {
      display: flex;
      justify-content: space-between;
      margin-bottom: 39px;
      .item {
        width:358px;
        height:122px;
        padding: 27px 23px 19px;
        display: flex;
        box-sizing: border-box;
        background: #ffffff;
        box-shadow:1px 14px 29px 0px rgba(138,97,250,0.19);
        border-radius:10px;
        .desc{
          .num{
            font-size: 30px;
            color: #243054;
            margin-bottom: 18px;
          }
          .title{
            font-size: 18px;
            color: #3C3C3C;
          }
        }
      }
    }
    .module{
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .item{
        width:191px;
        height:176px;
        color: #243054;
        font-size: 20px;
        background: #ffffff;
        text-align: center;
        padding-top: 27px;
        box-sizing: border-box;
        box-shadow:1px 14px 29px 0px rgba(138,97,250,0.19);
        border-radius:10px;
        cursor: pointer;
        &.on{
          background: #3FBDD4;
          color: #ffffff;
        }
        img{
          width: 70px;
          height: 70px;
          margin-bottom: 20px;
        }
      }
    }
    .charts{
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      .chart-left{
        width:848px;
        .chart-line{
          width:100%;
          height:419px;
          background: #ffffff;
          box-shadow:1px 14px 29px 0px rgba(138,97,250,0.19);
          border-radius:10px;
        }
      }
      .chart-right{
        width:656px;
        .chart-radar{
          width:100%;
          height:419px;
          background:#ffffff;
          box-shadow:1px 14px 29px 0px rgba(138,97,250,0.19);
          border-radius:10px;
        }
      }
      .chart-title{
        font-size: 24px;
        color: #243054;
        margin-bottom: 35px;
      }
    }
  }
</style>
