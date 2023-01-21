import express from "express";
import cors from "cors";
import { finalRouter } from "./routes/audio.js";

class Server {
  // Use the constructor to create an instance of express and use the class methods.
  constructor() {
    this.app = express();
    this.server();
    this.middlewares();
    this.routes();
  }

  // Create a middlewares method.
  middlewares() {
    this.app.use(express.json());
    // CORS added
    // CORS added
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  // Create a method to use the different routes of the app.
  routes() {
    this.app.get("/", (req, res) => {
      res.json({
        users: [
          { name: "Nicolás", lastname: "Biondini" },
          { name: "Jonh", lastname: "Doe" },
        ],
      });
    });
    this.app.use(finalRouter);
  }

  // Create a method to start the server.
  server() {
    this.app.listen(3001, () => {
      console.log("Dev tutorial API listening on port 3001");
    });
  }
}

export default new Server();
