const userRoutes = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      auth: true,
    },
    component: () => import('@/views/profile/Profile.vue'),
  },
];

export default userRoutes;
