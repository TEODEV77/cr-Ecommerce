import http from "http";

import app from "./express.js";
import { environment } from "./env.js";
import { ServerRunning } from "./utils/messages.js";

const { port } = environment.api;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  ServerRunning(port);
});
