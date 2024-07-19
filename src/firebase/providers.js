import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {FirebaseAuth} from './config'



export const registerUser = async ({email, password, displayName}) =>{
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user

        console.log(resp)
        await updateProfile(FirebaseAuth.currentUser, { displayName })
        return {
            ok: true,
            uid, photoURL, email, displayName
         }
        
    } catch (error) {
        
        return{
            ok: false,
            errorMessage: (() => {
                switch (error.message) {
                    case 'Firebase: Error (auth/email-already-in-use).':
                        return'El correo ingresado ya está en uso'
                    default:
                    return error.message    
                }
            })()
        }
    }
}