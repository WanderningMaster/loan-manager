import express from "express";
import { authApi } from "../../api/auth/auth.api";

const authRouter = express.Router();

authRouter.post("/reg", authApi.reg);
authRouter.post("/login", authApi.login);
authRouter.get("/logout", authApi.logout);
authRouter.get("/refresh", authApi.refresh);

export {authRouter};