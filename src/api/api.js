export default {
  /* 资源管理接口 */
  resInfo: {
    add: "/resInfo/add", //资源信息添加(post)
    amount: "/resInfo/amount",  //资源汇总统计
    audit: "/resInfo/audit",  //资源信息审核 通过2，拒绝3
    get: "/resInfo/get", // 资源信息详情
    list: "/resInfo/list", //资源信息列表
    preview: "/resInfo/preview",  //资源信息预览
    update: "/resInfo/update" //资源信息修改(put)
  },
  resCat: {
    list: "/resCategory/list", // 资源信息分类
    listpage: "/resCategory/list", // 资源信息分类
    get: "/resCategory/get", // 资源信息分类详情
    add: "/resCategory/add", // 资源信息分类添加(post)
    update: "/resCategory/update" // 资源信息分类修改(put)
  },
  
  /* 资讯cms管理接口 */
  cms: {
    add: "/cmsCategory/add", // 资讯信息分类添加(post)
    list: "/cmsCategory/list", // 资讯信息分类列表
    listpage: "/cmsCategory/listh", // 资讯信息分类列表(分页)
    update: "/cmsCategory/update", // 资讯信息分类修改(put)
  },
  cmsInfo: {
    add: "/cmsInfo/add", //资讯信息添加(post)
    list: "/cmsInfo/listh", //资讯信息列表
    preview: "/cmsInfo/preview", //资讯信息预览
    get: "/cmsInfo/get", //资讯信息详情
    update: "/cmsInfo/update", //资讯信息修改(put)
    upload: "/cmsInfo/upload", //图片上传
    release: "/cmsInfo/release" // 资讯信息发布
  },
  /* 系统管理接口  */
  school: {
    add: "/school/add", //添加学校(post)
    list: "/school/listh", //学校列表
    listAll: "/school/listAll", //所有学校列表
    detail: "/school/get", //学校详情
    update: "/school/update" //修改学校(put)
  },
  period: {
    add: "/period/add", //添加学段(post)
    list: "/period/list", //学段列表
    listAll: "/period/listh", //学段列表
    update: "/period/update" //修改学段(put)
  },
  subject: {
    add: "/subject/add", //添加学科
    list: "/subject/listh", //学科列表(分页)
    query: "/subject/queryList", //学科列表(不分页)
    update: "/subject/update" //修改学科
  },
  subjectContent: { //学科目录
    listpage: "/subjectContent/listh", //学科目录列表(分页)
    list: "/subjectContent/list", //学科目录列表(不分页)
    detail: "/subjectContent/get", //学科目录详情
    add: "/subjectContent/add", //学科目录添加(post)
    modify: "/subjectContent/put" //学科目录修改(put)
  },
  grade: {
    add: "/grade/add", //添加年级
    listAll: "/grade/listAll", //所有年级列表
    listfor: "/grade/listForIds", //通过年级IDs获取对应的年级列表数据
    listforsubject: "/grade/listForSubjectId", //通过学科查询年级列表 grade/listForSubjectId
    list: "/grade/listh", //年级列表
    update: "/grade/update" //修改年级
  },
  edition: {
    add: "/edition/add", //添加版本
    listall: "/edition/list", //版本列表(不分页)
    list: "/edition/listh", //版本列表(分页)
    update: "/edition/update" //修改版本
  },
  role: {
    add: "/role/add", //添加角色
    list: "/role/list", //角色列表(分页)
    listAll: "/role/listAll", //角色列表(不分页)
    update: "/role/update" //修改角色
  },
  admin: {
    add: "/admin/add", //添加账号
    byadmin: "/admin/byadmin", //账号详情
    get: "/admin/get", //账号列表
    login: "/admin/login", //账号登录
    update: "/admin/update" //账号列表
  }, 
  user: {
    list: "/user/list", //用户列表
    school: "/school/listAll", //学校列表
    add: "/user/add", //添加用户
    update: "/user/update" //修改用户
  },  
  city: {
    list: "/city/list", //城市列表
    listAll: "/city/listAll", //城市列表
    get: "/city/get" //城市详情
  },
  loginAdmin: {
    login: "/loginAdmin/login", //超级管理员登录
    loginout: "/loginAdmin/loginout", //超级管理员登出
    sendCode: "/loginAdmin/sendCode", //生成验证码
    reset: "/admin/resetPassword" //重置密码
  }
}

