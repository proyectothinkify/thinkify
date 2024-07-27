import { useEffect, useState }  from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Avatar from '@mui/material/Avatar';
import { CancelOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { firebaseApiFunctions } from '../hooks/firebaseApiFunctions';
import { notificationPush, pushNotificationThunk } from '../store/userContent';
import { useDispatch, useSelector } from 'react-redux';

export default function NotificationList({ isNotificationClicked }) {
  const notificationsState = useSelector(state => state.teacherContent)
  const dispatch = useDispatch()
    
    // const [data, setData] = useState(null)

    // useEffect(() => {
      
    //     const getData = async () => {
    //         const { apiGet } = firebaseApiFunctions()
    //         const data = await apiGet()
    //         setData(data)
    //     }
    //     getData()
     
    // }, [])
    
    
    
    

    const onDeletebyId =  (id) => {

      const notificationsFiltered = notificationsState.notifications.notification.filter(noti => noti.id !== id)
      const notifications = {
        
          notification: notificationsFiltered,
          counter: notificationsState.notifications.counter
      }   
      console.log(notifications)
         dispatch(notificationPush(notifications))
         dispatch(pushNotificationThunk({notifications}))
      

        console.log(id)
        
        
    }

    
    
  

  
  return (
      <List className={'animate__animated animate__bounceInDown'} dense sx={{
          width: '100%',
          maxHeight: '50%',
          overflow: 'auto',
          maxWidth: 360,
          bgcolor: 'primary.main',
          position: 'absolute',
          right: 80, top: 60,
          display: !isNotificationClicked ? 'none' : 'block'
      }}>
      {notificationsState.notifications.notification.map((noti) => {
        
        return (
          <ListItem
            key={noti.id}
            secondaryAction={
                <IconButton onClick={()=>onDeletebyId(noti.id)}>
                    <CancelOutlined
                    sx={{color: 'white', '&:hover': {color: 'red'}}}
                
                />
                </IconButton>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  
                  
                />
              </ListItemAvatar>
                    <ListItemText
                        disableTypography
                        primary={noti.message}
                        sx={{
                            color: 'white'
                        }}
                    />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}