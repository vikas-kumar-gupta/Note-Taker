import { Router } from "express";

import { routesV1 } from "./v1/v1.routes";

class Routes {
  private readonly route: Router;

  constructor() {
    this.route = Router();
  }

  /**
   * @description Load All Routes
   */
  loadAllRoutes() {
    this.route.use("/v1", routesV1.loadV1Routes());
    return this.route;
  }
}

export const routes = new Routes();
