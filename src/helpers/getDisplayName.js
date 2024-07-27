import { useSelector } from "react-redux"

export const getDisplayName = () => {
    const{ displayName } = useSelector (state => state.auth)
    if (displayName) {
        const nameOnArray = displayName?.split(' ') 
        const userName = nameOnArray[0] + ' ' + nameOnArray[2]
        const firstChart = userName.charAt(0)
        return {userName, firstChart}
    } else {
        const userName = 'Cargando Usuario'
        return {userName, firstChart: userName.charAt(0)}
    }
    
}