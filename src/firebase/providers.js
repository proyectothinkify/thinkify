import { createUserWithEmailAndPassword, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail, updateProfile} from "firebase/auth";
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

export const loginUser = async (email, password) => {
    try {
        
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName} = result.user
        return {
            ok: true,
            uid, photoURL, displayName, email
        }
    }
    catch (error) {
        return {
            ok: false,
            errorMessage: (() => {
                switch (error.message) {
                    case 'Firebase: Error (auth/invalid-email).':
                        return 'El correo ingresado no esta registrado'
                    
                    case 'Firebase: Error (auth/invalid-credential).':
                        return 'La contraseña ingresada es incorrecta '
                    
                    default:
                    return error.message    
                }
            })()
        }

    }
}

export const logOutFirebase = async () => {
    return await FirebaseAuth.signOut()
}

export const updatePhotoURL = async (photoURL) => {
    try {
       await updateProfile(FirebaseAuth.currentUser, {
            photoURL
        })
        console.log(FirebaseAuth.currentUser)
        return {ok: true}
    } catch (error) {
        return {
            ok: false,
            
        }
    }
}

export const updateDisplayName = async (displayName) => {
   
    try {
       await updateProfile(FirebaseAuth.currentUser, {
            displayName
        })
        console.log(FirebaseAuth.currentUser)
        return {ok: true}
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const relogin = () => {
    
    reauthenticateWithCredential(FirebaseAuth.currentUser)
}

export const updatingEmail = async (email) => {
    try {
       await updateEmail(FirebaseAuth.currentUser, email)
        console.log(FirebaseAuth.currentUser)
        return {ok: true}
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const passwordChangeByEmail = async ({email}) => {

    try {
        const resp = await sendPasswordResetEmail(FirebaseAuth, email)
        return {
            ok: true,
            resp
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
    
}