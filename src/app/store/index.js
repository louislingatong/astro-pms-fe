import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import navbarMenuReducer from './navbarMenuSlice';
import userReducer from './userSlice';
import vesselReducer from './vesselSlice';
import machineryReducer from './machinerySlice';
import machinerySubCategoryReducer from './machinerySubCategorySlice';
import intervalReducer from './intervalSlice';
import vesselMachineryReducer from './vesselMachinerySlice';
import runningHourReducer from './runningHourSlice';
import workReducer from './workSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    navbarMenu: navbarMenuReducer,
    user: userReducer,
    vessel: vesselReducer,
    machinery: machineryReducer,
    machinerySubCategory: machinerySubCategoryReducer,
    interval: intervalReducer,
    vesselMachinery: vesselMachineryReducer,
    runningHour: runningHourReducer,
    work: workReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload'],
        // Ignore these paths in the state
        ignoredPaths: [
          'navbarMenu',
          'profile',
          'user',
          'vessel',
          'machinery',
          'machinerySubCategory',
          'vesselMachinery',
          'interval',
          'runningHour',
          'work'
        ],
      },
    }),
});
