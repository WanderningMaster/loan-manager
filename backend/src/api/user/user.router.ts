import express from "express";
import { userApi } from "./user.api";

const userRouter = express.Router();

userRouter.get("/reg", userApi.reg);

export {userRouter};