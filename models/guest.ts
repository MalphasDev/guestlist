import mongoose, { Model, Document } from "mongoose";

export interface IGuest extends Document {
  name: string;
  email: string;
  phone: string;
}

const GuestSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
});

const Guest: Model<IGuest> = mongoose.models.Guest || mongoose.model<IGuest>("Guest", GuestSchema);

export default Guest;
