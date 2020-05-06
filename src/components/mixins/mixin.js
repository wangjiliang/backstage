
export const getData = {
  data () {
    return {
      currentPage: 1,
      pageSize: 15,
      pageSizes: [10,15,20],
      total: 0,
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    //改变每页显示的条数
    handleSizeChange(val){
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData(1, val);
    },
    //翻页
    handleCurrentChange(val){
      this.currentPage = val;
      this.fetchData(val, this.pageSize);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  }
}

export const period = {
  data () {
    return {
      list: [],
      current: 0
    }
  },
  created () {
    let storage = JSON.parse(sessionStorage.getItem('period')) 
    this.list = storage
    this.current = storage[0].id
  },
  methods: {
     //切换学段
     changeItem(item) {
      if(this.current == item.id) return
      this.current = item.id
      this.fetchData()
    },
  }
}

export const operation = {
  data () {
    return {
      isAdd: false,
      row: null
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showModal() {
      return this.isShow
    }
  },
  methods: {
    handleEdit(row) {
      this.isAdd = true
      this.row = row
    },
    hide() {
      this.$emit('hide')
      if(this.isAdd) this.isAdd = false
      if(this.row) this.row = null
    },
    handleConfirm() {
      this.fetchData()
      this.$emit('hide')
      if(this.isAdd) this.isAdd = false
      if(this.row) this.row = null
    }
  }
}

export const submit = {
  props: {
    row: {
      type:Object,
      default: null
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if(this.row) {
      let obj = Object.assign({}, this.row)
      this.ruleForm = obj
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    },
    handleConfirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
			  if(valid){
					if( this.row ) {
            this.modify(this.ruleForm)
          } else {
            this.add(this.ruleForm)
          }
				}
			});
    }
  }
}
