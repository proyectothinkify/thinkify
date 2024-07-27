import { doc, setDoc, updateDoc } from "firebase/firestore/lite"
import { notificationPush } from "./teacherContentSlice"
import { FirebaseDB } from "../../firebase/config"
import { firebaseApiFunctions } from "../../hooks/firebaseApiFunctions"


export const pushNotificationThunk = ({notifications}) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    await dispatch(notificationPush({ notifications }))

    const flatNotitifactions = notifications.notification.flat(Infinity)
   
    console.log( flatNotitifactions, notifications.notification )
    
    const newDoc =  {
      notification: flatNotitifactions,
      counter: notifications.counter
    }

    const notificationRef = doc(FirebaseDB, `instructor`, `${uid}`)

    const resp = await setDoc(notificationRef, newDoc)

    console.log(resp)
    

   

    } 
}

export const pushNotificationCounter = ({notifications}) => {
  return async (dispatch, getState) => {
      
      dispatch(notificationPush({ notifications }))

      const flatNotitifactions = notifications.notification.flat(Infinity)
    
        const newDoc =  {
          notification: flatNotitifactions,
          notificationCounter: notifications.counter
      }
         const { apiUpdate } = firebaseApiFunctions()
    
       apiUpdate(newDoc, 'instructor')
    
    

    

      

      

    
    

   

    } 
}