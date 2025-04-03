import { Response, Request } from "express";
import { noteServiceV1 } from "../../../service";

class NoteController {
  /**
   * @description this method is used to get the list of notes which maches the given criteria
   * @param payload
   * @returns { INote[] }
   */
  getNoteList = async (req: Request, res: Response) => {
    try {
      const payload = req.query;
      const response = await noteServiceV1.getNoteList(payload);
      res.json(response);
    } catch (error: any) {
      console.error(`Error--getNoteList--msg ::`, error);
      res.status(400).json(error);
    }
  };

  /**
   * @description this method is used to get details of the note
   * @param { string } noteId
   * @returns { INote }
   */
  getNoteDetails = async (req: Request, res: Response) => {
    try {
      const noteId = <string>req.params.noteId;
      const response = await noteServiceV1.getNoteDetails(noteId);
      res.json(response);
    } catch (error: any) {
      console.error(`Error--getNoteDetails--msg ::`, error);
      res.status(400).json(error);
    }
  };

  /**
   * @description this method is used to create a new notes inside the DB
   * @param { any } payload
   * @returns { INote }
   */
  createNote = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const response = await noteServiceV1.createNote(payload);
      res.json(response);
    } catch (error: any) {
      console.error(`Error--createNote--msg ::`, error);
      res.status(400).json(error);
    }
  };

  /**
   * @description this method is used to delete the note with its _ids
   * @param noteId
   */
  deleteNote = async (req: Request, res: Response) => {
    try {
      const noteId = <string>req.params.noteId;
      const response = await noteServiceV1.deleteNote(noteId);
      res.json(response);
    } catch (error: any) {
      console.error(`Error--deleteNote--msg ::`, error);
      res.status(400).json(error);
    }
  };
}

export const noteControllerV1 = new NoteController();
