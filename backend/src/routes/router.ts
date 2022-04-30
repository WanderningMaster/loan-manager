import { server } from "../server";

import { authRouter } from "./auth/auth.router";
import { userRouter } from "./user/user.router";
import { authMiddleware } from "../middlewares/auth.middleware";

const initRoutes = () => {
    server.use("/api/user", authMiddleware, userRouter);
    server.use("/api/auth", authRouter);
}

export {initRoutes};

