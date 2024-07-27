import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  
} from "@mui/material";

import {  useNavigate } from 'react-router-dom';



export const DrawerItem = ({ text, icon, pathname }) => {
  const navigateTo = useNavigate();
  const path = text.toLowerCase().split(" ").join("")
  console.log(path, pathname)

    const handleClick = () => {
        navigateTo(`${path}`)
    }
  return (
    <>
      <ListItem disablePadding  >
              <ListItemButton
                  onClick={handleClick}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
        
          
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              color: pathname === `/${path}` ? '#012E40' : '',
                
              }}
            >
              {icon}
            </ListItemIcon>
         

          <ListItemText
            disableTypography
            primary={text}
            sx={{
              opacity: open ? 1 : 0,
              display: "block",
              color: pathname === `/${path}` ? '#012E40' : '',
              fontWeight: pathname === `/${path}` ? 'bolder' : '',
              
            }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};
