import express from "express";
import * as dotenv from "dotenv";
import { sequelize } from "./db/db";
import todosRoutes from "./routes/todos.route";
import path from "path";
import cors from "cors";
import logger from "./middleware/logger";

dotenv.config();

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

server.use(cors());
server.use("/static", express.static(path.resolve(path.resolve(), "static")));
server.use("/api", logger);
server.use("/api", todosRoutes);

server.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello api" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true })
    // await sequelize.sync();
    server.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
