import { registerUser} from "../../firebase/providers"
import { checkingCredentials, logout, login } from "./authSlice"



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