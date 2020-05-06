export default [
  {
    path: '',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/login.vue'),
    meta: { 
      show: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('views/home/Home.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('views/resource/resource.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('views/information/information.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/system',
    name: 'system',
    component: () => import('views/system/system.vue'),
    meta: {
      requireAuth: true
    }
  }
]