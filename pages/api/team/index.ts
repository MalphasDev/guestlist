import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Team from '../../../models/team';

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const teams = await Team.find({});
        res.status(200).json({ success: true, data: teams });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const teams = await Team.create(req.body);
        res.status(201).json({ success: true, data: teams });
      } catch (error) {
        console.error('Fehler', error);
        res
          .status(400)
          .json({ success: false, data: 'Post failed', error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}