import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://geistesfunke:mhqDboWGpTP5uDhm@cluster0.p8wsnxl.mongodb.net/?retryWrites=true&w=majority';
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

client = new MongoClient(uri, options);
clientPromise = client.connect();

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export const connectToDatabase = async () => {
if (client) {
return client;
}

if (!clientPromise) {
client = new MongoClient(uri, options);
clientPromise = client.connect();
}

client = await clientPromise;
return client;
};
