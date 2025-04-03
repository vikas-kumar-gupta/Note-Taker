import { NodeModel } from "../../models";
import BaseEntity from "../base.mongo.entity";

export class NoteEntity extends BaseEntity {
  constructor() {
    super(NodeModel);
  }
}

export const NoteE = new NoteEntity();
