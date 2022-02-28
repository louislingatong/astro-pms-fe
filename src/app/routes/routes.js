import {lazy} from 'react'

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    auth: true,
    component: lazy(() => import('../views/Dashboard')),
  },
  {
    name: 'Profile',
    path: '/profile',
    auth: true,
    component: lazy(() => import('../views/Profile')),
  },
  {
    name: 'Users',
    path: '/users',
    auth: true,
    component: lazy(() => import('../views/management/UserList')),
  },
  {
    name: 'Vessels',
    path: '/vessels',
    auth: true,
    component: lazy(() => import('../views/management/VesselList')),
  },
  {
    name: 'Machinery',
    path: '/machinery',
    auth: true,
    component: lazy(() => import('../views/management/machinery/MachineryList')),
  },
  {
    name: 'Vessel Machinery',
    path: '/vessel-machinery',
    auth: true,
    component: lazy(() => import('../views/management/vessel-machinery/VesselMachineryList')),
  },
  {
    name: 'Intervals',
    path: '/intervals',
    auth: true,
    component: lazy(() => import('../views/management/interval/IntervalList')),
  },
  {
    name: 'Running Hours',
    path: '/running-hours',
    auth: true,
    component: lazy(() => import('../views/pms/RunningHourList')),
  },
  {
    name: 'Works',
    path: '/works',
    auth: true,
    component: lazy(() => import('../views/pms/WorkList')),
  },
  {
    name: 'Login',
    path: '/login',
    component: lazy(() => import('../views/auth/Login')),
  },
  {
    name: 'Forgot Password',
    path: '/forgot-password',
    component: lazy(() => import('../views/auth/ForgotPassword')),
  },
  {
    path: '*',
    invalid: true,
  }
];

export default routes;
