import {useEffect, useMemo} from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Badge, Breadcrumbs, Chip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { DrawerItem } from "./DrawerItem";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FlagIcon from "@mui/icons-material/Flag";
import { useDispatch, useSelector } from "react-redux";
import { startLogOut } from "../store/auth/thunks";
import { getDisplayName } from "../helpers/getDisplayName";
import { NavLink, useLocation } from "react-router-dom";
const drawerWidth = 240;
import HomeIcon from "@mui/icons-material/Home";
import { breadCrumbSwitcher } from "../helpers/breadcrumbSwitcher";
import { useState } from "react";
import { updatePhotoURL } from "../firebase/providers";
import { FirebaseAuth, FirebaseDB } from "../firebase/config";
import { useNotificationsCounter } from "../hooks/useNotifications";
import { pushNotificationThunk } from "../store/userContent/thunks";
import { doc, getDoc } from "firebase/firestore/lite";
import { notificationPush } from "../store/userContent/teacherContentSlice";
import { firebaseApiFunctions } from "../hooks/firebaseApiFunctions";
import NotificationList from "./NotificationList";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function EmployeeLayout({ children }) {
  const  {notifications: {notification, counter}}  = useSelector(state => state.teacherContent)
  const  {photoURL}  = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);
  const memoNotification= useMemo(()=> notification ? notification : [{message: null, id: null}],[notification])

  
 

  useEffect(() => {
    
    const getNotification = async () => {
      const {apiGet} = firebaseApiFunctions()
      const data = await apiGet()
        
     
      dispatch(notificationPush({ notifications: {notification: data?.notification, counter: data?.counter}}))
      
    }
    getNotification()
    
  
  }, [])
  
 
  
 
  

  const pathnames = pathname.split("/").filter((x) => x);
 
  const isHome = pathnames.includes("sandbox");

  const { userName, firstChart } = getDisplayName();
  const listNames = [
    "Mi perfil",
    "Notificaciones",
    "Mis cursos",
    "Mis objetivos",
    "Crear curso"
  ];
  const icons = [
    <PersonIcon />,
    <NotificationsIcon />,
    <MenuBookIcon />,
    <FlagIcon />,
    <CreateNewFolderIcon/>
  ];

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    dispatch(startLogOut());
  };

  // const notification = stateNotifications ? stateNotifications.notification : []


  const onNotifications = () => {
    
    setIsNotificationClicked(!isNotificationClicked )
    
    const notifications = {
      notification: [...memoNotification],
      counter: 0 
    }
    
    dispatch(pushNotificationThunk({ notifications }))
    
   
  }

  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            SANDBOX EDUCATION
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={()=>onNotifications()}
            >
              <Badge badgeContent={counter} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Typography>{userName}</Typography>
            <Avatar src={photoURL} sx={{ bgcolor: "red" }}>{firstChart}</Avatar>
            <IconButton aria-label="logout" size="small" onClick={onLogout}>
              <LogoutIcon sx={{ color: "white", fontSize: 30 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listNames.map((text, index) => (
            <DrawerItem key={text} text={text} icon={icons[index]} pathname={pathname} />
          ))}
        </List>
        <Divider />
        
      </Drawer>
      <NotificationList
        isNotificationClicked={isNotificationClicked}
        setIsNotificationClicked={setIsNotificationClicked}
      
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink to="sandbox">
            <Chip label="SANDBOX" icon={<HomeIcon fontSize="small" />} />
          </NavLink>
          {!isHome &&
            pathnames.map((name, index) => {
              const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              return isLast ? (
                <Chip
                  key={index}
                  label={breadCrumbSwitcher(name)}
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                />
              ) : (
                <NavLink to={routeTo}>
                  <Chip  key={index} label={breadCrumbSwitcher(name)} />
                </NavLink>
              );
            })}
        </Breadcrumbs>
        {children}
      </Box>
    </Box>
  );
}
