import mongoose from "mongoose";

const connection = {};
const mongouri =process.env.MONGODB_URI;

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}
export default dbConnect;
