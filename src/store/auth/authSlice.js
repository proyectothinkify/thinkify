import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({ 
    name: 'auth',   
    initialState: { 
     status: 'checking', //'checking', 'authenticated'
     submitStatus: null,
     uid: null,
     email: null,
     displayName: null,
     photoURL: null,
    errorMessage: null,
    savePhotoURL: null
     
   },
    reducers: {  
           login: (state, { payload }) => {
            state.status = 'authenticated',
            state.submitStatus = 'checked'
              state.uid = payload.uid,
              state.email = payload.email,
              state.displayName = payload.displayName,
              state.photoURL = payload.photoURL,
              state.errorMessage = null;
               
           },
           logout: (state, {payload }) => {
               state.status = 'not-authenticated'
               state.submitStatus = 'checked'
               state.uid = null,
               state.email = null,
               state.displayName = null,
               state.photoURL = null,
               state.errorMessage = payload;
           },
           checkingCredentials: (state)=>{
               state.status = 'checking';
        },
           checkingSubmitStatus: (state) => {
               state.submitStatus = 'checking';
        },
        editPhoto: (state, { payload }) => {
          
            state.photoURL = payload
           
        },
        editEmail: (state, { payload }) => {
          
            state.email = payload
            state.errorMessage = payload;
        },
        editDisplayName: (state, { payload }) => {
          
            state.displayName = payload
            state.errorMessage = payload;
        },
              
        addNotification: (state, { payload }) => {
            state.notifications = payload
        },
        savedPhoto: (state, { payload }) => {
            state.savePhotoURL = payload
        }
          
          

       } 
 });
export const { login, logout, checkingCredentials,editDisplayName,editPhoto, addNotification, editEmail, savedPhoto } = authSlice.actions;
 


