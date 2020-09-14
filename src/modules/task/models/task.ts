import mongoose, { Document, Schema } from 'mongoose';

export interface Task extends Document {
  title: string;
  description: string;
  serialize: Function;
}

interface SerializedTask {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const TaskSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

TaskSchema.methods.serialize = function(): SerializedTask {
  const obj = {
    _id: this._id,
    title: this.title,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };

  return obj;
};

export default mongoose.model<Task>('Task', TaskSchema);
