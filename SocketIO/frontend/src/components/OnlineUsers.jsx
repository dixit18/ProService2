import { Avatar } from "@chatscope/chat-ui-kit-react";
import {
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));

const OnlineUsers = ({ onlineUser }) => {
  const [online, setOnline] = useState(null);
  //   console.log(onlineUser);

  useEffect(() => {
    const getOnlineUser = async () => {
      if (onlineUser) {
        const res = await axios.get(
          `http://localhost:8000/api/${onlineUser?.userId}`
        );
        setOnline(res.data);
      }
    };
    getOnlineUser();
  }, [onlineUser]);

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <ListItem disablePadding sx={{ mt: 1, width: "32ch" }}>
        <ListItemButton>
          <ListItemAvatar>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src="https://mui.com/static/images/avatar/2.jpg" />
            </StyledBadge>
          </ListItemAvatar>
          <ListItemText primary={online?.data.user.name} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default OnlineUsers;
