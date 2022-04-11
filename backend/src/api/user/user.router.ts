import express from "express";
import { errorHandler } from "../../middlewares/errorHandler.middleware";
import { userApi } from "./user.api";

const userRouter = express.Router();

userRouter.post("/reg", userApi.reg);
userRouter.get("/", userApi.getAllUsers);
userRouter.get("/:id", userApi.getUserById);
userRouter.post("/", userApi.getUser);
// userRouter.post("/login", userApi.login);

export {userRouter};