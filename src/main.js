import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Http from '@/api/http.js' //请求封装get,post,put
import Api from '@/api/api.js' //请求接口
import baseUrl  from '@/common/baseUrl'

import { 
  Form, Input, Upload, FormItem, Select, Option, 
  Table, TableColumn, Button, Pagination, Message, Dialog, Divider,Row,Col
} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.http = Http
Vue.prototype.api = Api
Vue.prototype.$message = Message
Vue.prototype.baseUrl = baseUrl

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
