import mongoose, { Document } from "mongoose";

interface IPrice extends Document {
  name: string;
  quantity: number;
  costs: {
    artist: number;
    tech: number;
    material: {
      lyko: number;
      oil: number;
      powder: number;
      pyro: number;
      misc: number;
      support: number;
    };
  };
  costSum: number;
}

const priceSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: Number },
  costs: {
    artist: { type: Number },
    tech: { type: Number },
    material: {
      lyko: { type: Number },
      oil: { type: Number },
      powder: { type: Number },
      pyro: { type: Number },
      misc: { type: Number },
      support: { type: Number },
    },
  },
  costSum: { type: Number },
});

export default mongoose.models.Price ||
  mongoose.model<IPrice>("Price", priceSchema);
