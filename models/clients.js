const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
  clientname: {
    firstname: { type: String },
    lastname: { type: String },
  },
  invoice: {
    firm: { type: String },
    street: { type: String },
    nr: { type: String },
    postcode: { type: String },
    city: { type: String },
  },
  contact: {
    phone: { type: Number },
    email: { type: String },
  },
});

module.exports =
  mongoose.models.Clients || mongoose.model("Clients", clientSchema);
