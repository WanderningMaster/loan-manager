import express from "express";
import { authApi } from "../../api/auth/auth.api";

const authRouter = express.Router();

authRouter.post("/login", authApi.login);

export {authRouter};