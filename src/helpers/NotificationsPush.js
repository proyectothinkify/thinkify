import { useState } from "react"







export const useNotificationsCounter = (notifications) => {
    const [counter, setCounter] = useState(notifications)

    const notificationIconClicked = () => setCounter(0)
        
    

    return {
        notificationIconClicked,
        counter
    }
}