import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import navbarMenuReducer from './navbarMenuSlice';
import userReducer from './userSlice';
import vesselReducer from './vesselSlice';
import machineryReducer from './machinerySlice';
import intervalReducer from './intervalSlice';
import vesselMachineryReducer from './vesselMachinerySlice';
import runningHourReducer from './runningHourSlice';
import workReducer from './workSlice';
import optionReducer from './optionSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    navbarMenu: navbarMenuReducer,
    user: userReducer,
    vessel: vesselReducer,
    machinery: machineryReducer,
    interval: intervalReducer,
    vesselMachinery: vesselMachineryReducer,
    runningHour: runningHourReducer,
    work: workReducer,
    option: optionReducer
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
          'vesselMachinery',
          'interval',
          'runningHour',
          'work',
          'option'
        ],
      },
    }),
});
