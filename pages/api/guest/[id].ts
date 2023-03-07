import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Guest, { IGuest } from "../../../models/guest";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  if (typeof id !== "string") {
    return res.status(400).json({ success: false });
  }

  switch (method) {
    case "GET":
      try {
        const guest: IGuest | null = await Guest.findById(id);

        if (!guest) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: guest });
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;

    case "PUT":
      try {
        const updatedGuest: IGuest | null = await Guest.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!updatedGuest) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: updatedGuest });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedGuest = await Guest.deleteOne({ _id: id });

        if (!deletedGuest.deletedCount) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
