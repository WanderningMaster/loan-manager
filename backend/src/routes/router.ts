import { server } from "../server";

import { userRouter } from "./user/user.router";


const initRoutes = () => {
    server.use("/api/user", userRouter);
}

export {initRoutes};

