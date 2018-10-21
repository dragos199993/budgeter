
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/Index.vue'),
        meta: {requiresAuth: true} }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/Authentication.vue'),
    children: [
      { path: 'login', component: () => import('pages/Login.vue'), guest: true },
      { path: 'register', component: () => import('pages/Register.vue'), guest: true }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
