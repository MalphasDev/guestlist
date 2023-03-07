import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import Team from "../../../models/team";
import dbConnect from "../../../utils/dbConnect";
dbConnect();

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },

  secret: "test",
  jwt: { secret: "test", encryption: true },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const name = credentials.userName;
        const password = credentials.userPass;
        const user = await Team.findOne({ name });
        if (!user) {
          throw new Error("Benutzer nicht gefunden.");
        }
        if (user) {
          return signInUser(password, user);
        }
      },
    }),
  ],
  database:process.env.MONGODB_URI,
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        return token;
      }
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
};
const signInUser = async (password, user) => {
  if (!user.password) {
    throw new Error("Passwort eingeben!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Login-Daten nicht korrekt.");
  }
  return user;
};

export default NextAuth(authOptions);
