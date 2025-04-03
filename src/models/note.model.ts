import { Schema, Types } from "mongoose";
import { mongo } from "../database/mongo.connection";

export interface INote {
  _id: Types.ObjectId;
  title: string;
  content: string;
  catFact: string;
  createdAt: number;
  updatedAt: number;
}

const noteSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    required: true,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  catFact: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().getTime(),
  },
  updatedAt: {
    type: Date,
    default: new Date().getTime(),
  },
});

export const NodeModel = mongo
  .getConnection()
  .model<INote>("note", noteSchema, "notes");
