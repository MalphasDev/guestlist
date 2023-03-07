import mongoose, { Schema, Document, Model } from "mongoose";

// Define interfaces for Mongoose documents
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

interface IInquiery extends Document {
  inquieryStatus: string;
  inquieryStatusDesc: string;
  operator: string[];
  date: Date;
  client: {
    clientname: {
      firstname: string;
      lastname: string;
    };
    invoice: {
      firm: string;
      street: string;
      nr: string;
      postcode: string;
      city: string;
    };
    contact: {
      phone: number;
      email: string;
    };
  };
  location: {
    street: string;
    nr: string;
    postcode: string;
    city: string;
  };
  show: {
    variant: string;
    artistnumber: number;
  };
  artist: string[];
  support: {
    name: string[];
  };
}

interface IContract extends Document {
  pricing: {
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
  };
  contracts: {
    operator: string;
    address: {
      firm: string;
      name: string;
      street: string;
      city: string;
    };
    date: Date;
    show: {
      variant: string;
      duration: number;
      quantity: number;
    };
    contractNumber: string;
    client: {
      name: string;
      street: string;
      city: string;
      phone: string;
      email: string;
    };
    contact: {
      name: string;
      phone: string;
      email: string;
    };
    location: {
      street: string;
      city: string;
    };
    netto: number;
    payment: string;
  };
  offers: {
    operator: string;
    address: {
      firm: string;
      name: string;
      street: string;
      city: string;
    };
    date: Date;
    validUntil: Date;
    show: {
      variant: string;
      services: string[];
    };
    offerNumber: string;
    location: {
      street: string;
      city: string;
    };
    netto: number;
  };
  invoice: {
    operator: string;
    address: {
      firm: string;
      name: string;
      street: string;
      city: string;
    };
    date: Date;
    show: string;
    contractNumber: string;
    location: {
      street: string;
      city: string;
    };
    netto: number;
  };
}
const priceSchema: Schema = new Schema({
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

export const Price: Model<IPrice> =
  mongoose.models.Price || mongoose.model<IPrice>("Price", priceSchema);
