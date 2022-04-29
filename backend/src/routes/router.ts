import { server } from "../server";

import { authRouter } from "./auth/auth.router";
import { userRouter } from "./user/user.router";


const initRoutes = () => {
    server.use("/api/user", userRouter);
    server.use("/api/auth", authRouter);
}

export {initRoutes};

