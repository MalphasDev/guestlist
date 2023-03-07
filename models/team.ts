import mongoose, { Model, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  color: string;
  icon: string;
  password: string;
  email: string;
  emailVerified: Date;
}

const teamSchema = new mongoose.Schema({
  name: { type: String },
  color: { type: String },
  icon: { type: String },
  password: { type: String },
  email: { type: String },
  emailVerified: { type: Date },
});

const Team: Model<ITeam> = mongoose.models.Team || mongoose.model<ITeam>("Team", teamSchema);

export default Team;
