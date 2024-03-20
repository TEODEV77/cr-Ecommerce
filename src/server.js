import http from "http";

import app from "./express.js";
import { environment } from "./env.js";
import { ServerRunning } from "./utils/messages.js";
import MongoSingleton from "./database/mongoSingleton.js";

const { port } = environment.api;

const PORT = process.env.PORT || port;

await MongoSingleton.getInstance();

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  ServerRunning(PORT);
});
