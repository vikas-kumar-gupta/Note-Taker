import { Router } from "express";
import Joi from "joi";
import { validate } from "../../../middleware/validation/validation";
import { noteControllerV1 } from "../../../controller";

class NoteRoute {
  private noteRoute: Router;

  constructor() {
    this.noteRoute = Router();
  }

  loadNoteRoutes() {
    this.noteRoute.get(
      "/",
      validate.queryParam(
        Joi.object({
          limit: Joi.number().min(1),
          page: Joi.number().min(1),
          title: Joi.string().min(1).optional(),
          content: Joi.string().min(1).optional(),
          catFact: Joi.string().min(1).optional(),
        })
      ),
      noteControllerV1.getNoteList
    );

    this.noteRoute.post(
      "/",
      validate.body(
        Joi.object({
          title: Joi.string().min(1).required(),
          content: Joi.string().min(1).required(),
        })
      ),
      noteControllerV1.createNote
    );

    this.noteRoute.get(
      "/:noteId",
      validate.params(
        Joi.object({
          noteId: Joi.string().min(24).max(24).required(),
        })
      ),
      noteControllerV1.getNoteDetails
    );

    this.noteRoute.delete(
      "/:noteId",
      validate.params(
        Joi.object({
          noteId: Joi.string().min(24).max(24).required(),
        })
      ),
      noteControllerV1.deleteNote
    );
    return this.noteRoute;
  }
}

export const NoteRouteV1 = new NoteRoute();
