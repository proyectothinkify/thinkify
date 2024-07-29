import { useEffect, useRef, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { CancelOutlined } from "@mui/icons-material";
import { Box, Collapse, IconButton } from "@mui/material";
import { firebaseApiFunctions } from "../hooks/firebaseApiFunctions";
import { notificationPush, pushNotificationThunk } from "../store/userContent";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NotificationItem } from "./NotificationItem";

export default function NotificationList({ isNotificationClicked,setIsNotificationClicked }) {
  
    
    const ref = useRef(null);
  
    const handleClickOutside = (event) => {
      // Verifica si el clic fue fuera del elemento
      if (ref.current && !ref.current.contains(event.target)) {
        setIsNotificationClicked(false);
      }
    };
  
    useEffect(() => {
      // Agrega el listener al documento
      document.addEventListener('mousedown', handleClickOutside);
      
      // Limpia el listener al desmontar el componente
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


  const notificationsState = useSelector((state) => state.teacherContent);
  const dispatch = useDispatch();

  // const [data, setData] = useState(null)

  // useEffect(() => {
  //     const getData = async () => {
  //         const { apiGet } = firebaseApiFunctions()
  //         const data = await apiGet()
  //         setData(data)
  //     }
  //     getData()
  // }, [])

  const onDeletebyId = (id) => {
    const notificationsFiltered =
      notificationsState.notifications.notification.filter(
        (noti) => noti.id !== id
      );
    const notifications = {
      notification: notificationsFiltered,
      counter:
        notificationsState.notifications.counter === 0
          ? 0
          : notificationsState.notifications.counter - 1,
    };
    console.log(notifications);
    dispatch(notificationPush(notifications));
    dispatch(pushNotificationThunk({ notifications }));

    console.log(id);
  };

  return (
    <List
      ref={ref}
      className={"animate__animated animate__bounceInDown"}
      dense
      sx={{
        width: "100%",
        maxHeight: "50%",
        overflow: "auto",
        maxWidth: 360,
        bgcolor: "primary.main",
        position: "absolute",
        right: 80,
        top: 60,
        display: !isNotificationClicked ? "none" : "block",
      }}
    >
      {notificationsState?.notifications.notification.length <= 0 ? (
        <ListItem>
          <ListItemText
            disableTypography
            primary={"No hay notificaciones"}
            sx={{
              color: "white",
              textAlign: "center",
            }}
          />
        </ListItem>
      ) : (
          <TransitionGroup>
            {
              notificationsState.notifications.notification.map((noti) => (
                <Collapse key={noti.id}>{<NotificationItem noti={noti} onDeletebyId={onDeletebyId} />}</Collapse>
              ))

            }

        </TransitionGroup>
      )}
    </List>
  );
}
