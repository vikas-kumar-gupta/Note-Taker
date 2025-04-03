import { Connection, ConnectOptions, createConnection } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

class MongoConnection {
  private connection: any;
  constructor() {
    this.initiateMongoConnection();
  }

  /**
   * @description Business MongoDb Connection
   */
  initiateMongoConnection() {
    try {
      if (!this.connection) {
        const options: ConnectOptions = {};
        this.connection = createConnection(
          <string>process.env.MONGO_URI,
          options
        );
        this.connection.set("debug", true);
        this.registerConnectionEvent();
        console.log("Initiated Mongo Conection");
      }
    } catch (error) {
      console.error("Mongo Connection Error::", Error);
    }
  }

  /**
   * @description Register event to trace connection and Error from Mongo for Business connection
   */
  private registerConnectionEvent() {
    this.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
    this.connection.once("open", () => {
      console.info("MongoDB connected successfully!");
    });
  }

  getConnection(): Connection {
    let conn: Connection = this.connection;
    return conn;
  }
}

export const mongo = new MongoConnection();
