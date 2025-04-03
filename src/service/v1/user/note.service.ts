import axios from "axios";
import { NoteE } from "../../../entity";
import { INote } from "../../../models";
import { PipelineStage } from "mongoose";

class NoteService {
  /**
   * @description this method is used to get the cat fact form the catfact official site
   * @returns { string }
   */
  async getCatFact() {
    const catFactUrl = "https://catfact.ninja/fact";
    const res = await axios.get(catFactUrl);
    return res.data.fact;
  }

  /**
   * @description this method is used to get the list of notes which maches the given criteria
   * @param payload
   * @returns { INote[] }
   */
  async getNoteList(payload: any) {
    const page = payload.page || 1;
    const limit = payload.limit || 10;
    const orCriteria = [];
    let matchStage: any = {};

    if (payload.title) {
      orCriteria.push({
        title: {
          $regex: payload.title,
          $options: "si",
        },
      });
    }

    if (payload.content) {
      orCriteria.push({
        content: {
          $regex: payload.content,
          $options: "si",
        },
      });
    }

    if (payload.catFact) {
      orCriteria.push({
        catFact: {
          $regex: payload.catFact,
          $options: "si",
        },
      });
    }

    if (orCriteria.length > 0) {
      matchStage["$or"] = orCriteria;
    }

    const pipeline: PipelineStage[] = [
      { $match: matchStage },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit + 1,
      },
    ];

    const noteList = await NoteE.aggregateData(pipeline, {});
    return noteList;
  }

  /**
   * @description this method is used to get details of the note
   * @param { string } noteId
   * @returns { INote }
   */
  async getNoteDetails(noteId: string) {
    const note = await NoteE.findById(noteId);

    if (!note) {
      throw new Error(`Note not found with id: ${noteId}`);
    }

    return note;
  }
  
  /**
   * @description this method is used to create a new notes inside the DB
   * @param { any } payload
   * @returns { INote }
   */
  async createNote(payload: any) {
    const noteData = {
      ...payload,
      catFact: await this.getCatFact(),
    };
    const note = await NoteE.saveData(noteData);
    return note;
  }

  /**
   * @description this method is used to delete the note with its _ids
   * @param noteId
   */
  async deleteNote(noteId: string) {
    const delCriteria = {
      _id: NoteE.ObjectId(noteId),
    };
    const res = await NoteE.deleteOne(delCriteria);

    console.log(res);

    if (res.deletedCount === 1) {
      return {};
    } else {
      throw new Error(`Note not found with id: ${noteId}`);
    }
  }
}
export const noteServiceV1 = new NoteService();
