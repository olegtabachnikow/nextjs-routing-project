import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { connectMongoDB, insertDocument } from '@/helpers/db-util';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client: MongoClient = new MongoClient('mongodb://localhost:27017', {
    monitorCommands: true,
  });
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }
    try {
      client = await connectMongoDB();
    } catch (error) {
      res.status(500).json({ message: 'Connection to database failed' });
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed' });
    }
    res.status(201).json({ message: 'Signed up!' });
  }
}
