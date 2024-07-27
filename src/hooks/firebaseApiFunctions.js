import { useState } from "react"
import { FirebaseAuth, FirebaseDB } from "../firebase/config"
import { doc, getDoc, updateDoc, deleteField  } from "firebase/firestore/lite"




export const firebaseApiFunctions = () => {

    

    const uid = FirebaseAuth.currentUser.uid

    const apiGet = async () => {
        
        
        const docRef = doc(FirebaseDB, 'instructor', `${uid}`)
        const resp = await getDoc(docRef )
        const data = resp.data()

        return data
       
    }

    const apiUpdate = async (newDoc, ref) => {

    
      const docRef = doc(FirebaseDB, ref, `${uid}`)

       await updateDoc(docRef, newDoc)
        
    }

    const apiNotificationDeleteById = async (id) => {
        
        const data = await apiGet()
        const filteredData = data.notification.filter(obj => obj.id !== id)
        await apiUpdate(filteredData, 'instructor')
        return filteredData


       
    }

    return {
        apiGet,
        apiUpdate,
        
    }
}