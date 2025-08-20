import { isAuth, login, singup, updateProfile } from "../controllers/userController.js";
import express from express;
import { protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('singup', singup)
userRouter.post('login', login)
userRouter.put('updateProfile',protectRoute, updateProfile)
userRouter.get('/check',protectRoute, isAuth)

export default userRouter;