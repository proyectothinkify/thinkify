
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { teacherContentSlice } from './userContent'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    teacherContent: teacherContentSlice.reducer
    
    
  },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
  
  
})

