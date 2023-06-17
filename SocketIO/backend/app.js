const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const conversationRouter = require("./routes/conversationRoute");
const messageRouter = require("./routes/messageRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.status(200).json({ message: "home page" }));

app.use("/api", userRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

module.exports = app;
