import { protectRoute } from "../middleware/auth.js";
import express from"express";
import { getAllMessages, getUserinSideBar, markAllMessagesAsSeen, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/user", protectRoute, getUserinSideBar);
messageRouter.get("/:id", protectRoute, getAllMessages);
messageRouter.get("/mark/:id", protectRoute, markAllMessagesAsSeen);
messageRouter.post('/send/:id',protectRoute,sendMessage)

export default messageRouter;