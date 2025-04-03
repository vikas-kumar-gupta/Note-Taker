import { Router } from "express";
import { NoteRouteV1 } from "./note.routes";

class UserRoute {
  private userRoute: Router;

  constructor() {
    this.userRoute = Router();
  }

  loadUserRoutes() {
    this.userRoute.use("/note", NoteRouteV1.loadNoteRoutes());
    return this.userRoute;
  }
}

export const userRouteV1 = new UserRoute();
