// eslint-disable-next-line no-unused-vars
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";
import AuthContext from "../store/auth-context";
import { Box, Grid } from "@mui/material";
import Conversations from "./Conversations";
import axios from "axios";
import { io } from "socket.io-client";
import OnlineUsers from "./OnlineUsers";

const ChatBox = () => {
  const authCtx = useContext(AuthContext);
  const socket = useRef();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prevState) => [...prevState, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/conversation/${user._id}`
        );
        setConversation(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/message/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMessages();
  }, [currentChat]);

  const onChangeHandler = (value) => {
    setIsTyping(true);
    setNewMessage(value);
    if (value === "") {
      setIsTyping(false);
    }
  };

  const sendHandler = async () => {
    setIsTyping(false);
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:8000/api/message",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentChat = async (secondUserId) => {
    try {
      const res = await axios(
        `http://localhost:8000/api/conversation/${user._id}/${secondUserId}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return authCtx.user ? (
    <Box sx={{ flexGrow: 1, m: 6 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className="container">
            {conversation &&
              conversation.map((conv, key) => (
                <div key={key} onClick={() => setCurrentChat(conv)}>
                  <Conversations conversation={conv} currUser={user} />
                </div>
              ))}
          </div>
        </Grid>
        <Grid item xs={7}>
          <div className="container">
            <div>
              {currentChat ? (
                <MainContainer>
                  <ChatContainer style={{ width: "1050px", height: "800px" }}>
                    <ConversationHeader>
                      <Avatar src="https://mui.com/static/images/avatar/2.jpg" />
                      <ConversationHeader.Content
                        userName="Demo user"
                        info="Active 10 mins ago"
                      />
                      <ConversationHeader.Actions>
                        <VoiceCallButton />
                        <VideoCallButton />
                        <InfoButton />
                      </ConversationHeader.Actions>
                    </ConversationHeader>
                    <MessageList
                      typingIndicator={
                        isTyping && (
                          <TypingIndicator content={`${user.name} is typing`} />
                        )
                      }
                    >
                      {messages.map((mess, key) => (
                        <Message
                          key={key}
                          model={{
                            message: mess.text,
                            sentTime: "just now",
                            sender: "Joe",
                            direction:
                              mess.sender === user._id
                                ? "outgoing"
                                : "incoming",
                            position: "single",
                          }}
                        />
                      ))}
                    </MessageList>
                    <MessageInput
                      placeholder="Type message here"
                      onSend={sendHandler}
                      onChange={onChangeHandler}
                    />
                  </ChatContainer>
                </MainContainer>
              ) : (
                <h2 style={{ textAlign: "center" }}>No Chat!</h2>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="container">
            {onlineUsers?.map((onlineUser, key) => (
              <div
                key={key}
                onClick={handleCurrentChat.bind(
                  null,
                  onlineUser.userId !== user?._id && onlineUser.userId
                )}
              >
                {onlineUser.userId !== user?._id && (
                  <OnlineUsers onlineUser={onlineUser} />
                )}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <h2 style={{ textAlign: "center" }}>Please login to chat!</h2>
  );
};

export default ChatBox;
