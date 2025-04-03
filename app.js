"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
// import * as swaggerDocument from './../../swagger/aws-swagger.json';
// import { swaggerAuth, traceRequest } from '@middleware';
dotenv.config();
class App {
    //   private readonly contextPath: string = config.get(
    //     Config.HOME_APP_CONTEXT_PATH
    //   );
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        /**
         * @description handler for Express server when initialising server
         */
        this.callback = () => {
            console.log(`Home App server listening on : ${this.port}`);
        };
        this.startApp();
    }
    /**
     * @description Steps to Start the Express Sever
     */
    startApp() {
        // this.app = express();
        this.loadGlobalMiddleares();
        this.loadRoutes();
        this.intialiseServer();
    }
    /**
     * @description Load global Middlewares
     */
    loadGlobalMiddleares() {
        this.app.use(express_1.default.json());
        // if (<string>process.env.NODE_ENV != ENV.PROD) {
        //   this.app.use(
        //     `${this.contextPath}/api-docs`,
        //     serve,
        //     setup(swaggerDocument)
        //   );
        // }
    }
    /**
     * @description Load All Routes
     */
    loadRoutes() {
        // this.app.use(this.contextPath, routes.loadAllRoutes());
    }
    /**
     * @description Initiate Express Server
     */
    intialiseServer() {
        this.app.listen(this.port, this.callback);
    }
}
exports.App = App;
