import { CancelOutlined } from "@mui/icons-material"
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"


export const NotificationItem = ({onDeletebyId, noti}) => {
  return (
    <ListItem
            
            secondaryAction={
              <IconButton onClick={() => onDeletebyId(noti?.id)}>
                <CancelOutlined
                  sx={{ color: "white", "&:hover": { color: "red" } }}
                />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={noti?.message}
                sx={{
                  color: "white",
                }}
              />
            </ListItemButton>
          </ListItem>
  )
}
