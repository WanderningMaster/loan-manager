import express from "express";
import { userApi } from "../../api/user/user.api";

const userRouter = express.Router();

userRouter.get("/", userApi.getAllUsers);
userRouter.get("/:id", userApi.getUserById);
userRouter.post("/", userApi.getUser);
userRouter.get("/remove/:id", userApi.deleteUserById);

export {userRouter};