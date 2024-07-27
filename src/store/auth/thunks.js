import { updateEmail } from "firebase/auth"
import { loginUser, logOutFirebase, registerUser, updateDisplayName, updatePhotoURL, updatingEmail} from "../../firebase/providers"
import { checkingCredentials, logout, login, editPhoto, editDisplayName, editEmail } from "./authSlice"
import { fileUpload } from "../../helpers/fileupload"
import { FirebaseAuth } from "../../firebase/config"



export const checkingAuthentication = (email, password)=>{
    return async (dispatch) => {

        dispatch( checkingCredentials() )
    }
}



export const startCreatingUser=({email, password, displayName})=>{

    return async (dispatch) => {
        dispatch( checkingCredentials())
        const {ok, uid, photoURL, errorMessage} = await registerUser({email, password, displayName})
        if (!ok) return dispatch(logout(errorMessage))
        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLogin = ({email, password}) => {
    return async (dispatch) => {
            
            dispatch( checkingCredentials())
        const user = await loginUser(email, password)
      
            if(!user.ok) return dispatch(logout(user.errorMessage))
                dispatch(login(user))
       
    }
}

export const startLogOut = () => {
    return async (dispatch) => {
        await logOutFirebase()
        dispatch(logout())
    }
}
export const startEditingPhotoURL = (photoURL = []) => {
    return async (dispatch) => {
       
        const { url } = await fileUpload(photoURL)
        await updatePhotoURL(url)
        dispatch(editPhoto(url))
        dispatch(editPhoto(FirebaseAuth.currentUser.photoURL))
       
        
    }
}
export const startEditingDisplayName = (displayName) => {
    return async (dispatch) => {
        const { ok, errorMessage } = updateDisplayName(displayName)
        if(!ok) return editDisplayName(errorMessage)
        dispatch(editDisplayName(displayName))

    }
}
export const startEditingEmail = (email) => {
    return async (dispatch) => {
        const { ok, errorMessage } = updatingEmail(email)
        console.log(ok)
        if(!ok) return editEmail(errorMessage)
        dispatch(editEmail(email))

    }
}
