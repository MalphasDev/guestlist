import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Team, { ITeam } from "../../../models/team";

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
        const team: ITeam | null = await Team.findById(id);

        if (!team) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: team });
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;

    case "PUT":
      try {
        const updatedTeam: ITeam | null = await Team.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!updatedTeam) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: updatedTeam });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedTeam = await Team.deleteOne({ _id: id });

        if (!deletedTeam.deletedCount) {
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
