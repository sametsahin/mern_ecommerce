import http from "http";
import app from "./app/app.js";

//CREATING A SERVER
const PORT = process.env.PORT || 2031;
const server = http.createServer(app);
server.listen(PORT, console.log(`The server is up and running on ${PORT}`));
