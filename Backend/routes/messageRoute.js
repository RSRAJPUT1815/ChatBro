import { protectRoute } from "../middleware/auth.js";
import express from"express";
import { getAllMessages, getUserinSideBar, markAllMessagesAsSeen } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/user", protectRoute, getUserinSideBar);
messageRouter.get("/:id", protectRoute, getAllMessages);
messageRouter.get("/mark/:id", protectRoute, markAllMessagesAsSeen);

export default messageRouter;