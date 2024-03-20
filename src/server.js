import http from "http";

import app from "./express.js";
import { environment } from "./env.js";

const { port } = environment.api;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Server is running on$ ${port}`);
});
