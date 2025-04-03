import { Router } from "express";
import { userRouteV1 } from "./user/user.routes";

class V1Routes {
  private readonly route: Router;

  constructor() {
    this.route = Router();
  }

  /**
   * @description Load All V1 Routes
   */
  loadV1Routes() {
    this.route.use("/user", userRouteV1.loadUserRoutes());
    return this.route;
  }
}

export const routesV1 = new V1Routes();
