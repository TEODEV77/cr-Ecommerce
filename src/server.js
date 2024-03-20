import http from "http";

import app from "./express.js";
import { environment } from "./env.js";

const { port } = environment.api;

const PORT = process.env.PORT || port;
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server is running on ${port}`);
});
