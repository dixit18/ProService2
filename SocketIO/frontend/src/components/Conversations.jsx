import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Conversations = ({ conversation, currUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [currUser, conversation]);

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <ListItem disablePadding sx={{ mt: 1, width: "49ch" }}>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar
              // alt={`Avatar n`}
              src="https://mui.com/static/images/avatar/2.jpg"
            />
          </ListItemAvatar>
          <ListItemText primary={`${user?.data.user.name}`} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Conversations;
