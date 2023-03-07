import mongoose, { Schema, Document } from "mongoose";

interface IClientName extends Document {
  firstname: string;
  lastname: string;
}

interface IInvoice extends Document {
  firm: string;
  street: string;
  nr: string;
  postcode: string;
  city: string;
}

interface IContact extends Document {
  phone: number;
  email: string;
}

interface IClient extends Document {
  clientname: IClientName;
  invoice: IInvoice;
  contact: IContact;
}

interface ILocation extends Document {
  street: string;
  nr: string;
  postcode: string;
  city: string;
}

interface IShow extends Document {
  variant: string;
  artistnumber: number;
}

interface IInquiery extends Document {
  inquieryStatus: string;
  inquieryStatusDesc: string;
  operator: string[];
  date: Date;
  client: IClient;
  location: ILocation;
  show: IShow;
  artist: string[];
  support: {
    name: string[];
  };
}

const clientNameSchema: Schema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
});

const invoiceSchema: Schema = new Schema({
  firm: { type: String },
  street: { type: String },
  nr: { type: String },
  postcode: { type: String },
  city: { type: String },
});

const contactSchema: Schema = new Schema({
  phone: { type: Number },
  email: { type: String },
});

const clientSchema: Schema = new Schema({
  clientname: clientNameSchema,
  invoice: invoiceSchema,
  contact: contactSchema,
});

const locationSchema: Schema = new Schema({
  street: { type: String },
  nr: { type: String },
  postcode: { type: String },
  city: { type: String },
});

const showSchema: Schema = new Schema({
  variant: { type: String },
  artistnumber: { type: Number },
});

const inquierySchema: Schema = new Schema({
  inquieryStatus: {
    type: String,
  },
  inquieryStatusDesc: {
    type: String,
  },
  operator: {
    type: [String],
  },
  date: { type: Date },
  client: {
    type: clientSchema,
  },
  location: {
    type: locationSchema,
  },
  show: {
    type: showSchema,
  },
  artist: { type: [String] },

  support: {
    name: { type: [String] },
  },
});

export default mongoose.models.Inquiery as mongoose.Model<IInquiery> ||
  mongoose.model<IInquiery>("Inquiery", inquierySchema);
