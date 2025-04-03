import express, { Express } from "express";
import * as dotenv from "dotenv";
import { routes } from "./src/routes/routes";
import { mongo } from "./src/database/mongo.connection";
dotenv.config();

export class App {
  private app: Express = express();

  private readonly port = process.env.PORT || 3000;

  constructor() {
    this.startApp();
  }

  /**
   * @description Steps to Start the Express Sever
   */
  private async startApp() {
    mongo.initiateMongoConnection;
    this.loadGlobalMiddleares();
    this.loadRoutes();
    this.intialiseServer();
  }

  /**
   * @description Load global Middlewares
   */
  private loadGlobalMiddleares() {
    this.app.use(express.json());
  }

  /**
   * @description Load All Routes
   */
  private loadRoutes() {
    this.app.use("/", routes.loadAllRoutes());
  }

  /**
   * @description Initiate Express Server
   */
  private intialiseServer() {
    this.app.listen(this.port, this.callback);
  }

  /**
   * @description handler for Express server when initialising server
   */
  private readonly callback = () => {
    console.log(`AutoPe App server listening on : ${this.port}`);
  };
}

const server = new App();
export default server;
