import { NextApiRequest, NextApiResponse } from 'next';
import { Document, InsertOneResult, MongoClient } from 'mongodb';
import {
  getAllDocuments,
  connectMongoDB,
  insertDocument,
} from '@/helpers/db-util';
export type CommentData = {
  _id: string;
  email: string;
  name: string;
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventId = req.query.eventId;
  let client: MongoClient = new MongoClient('mongodb://localhost:27017', {
    monitorCommands: true,
  });
  try {
    client = await connectMongoDB();
  } catch (error) {}

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Input.' });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
    };
    let result: InsertOneResult<Document>;

    try {
      result = await insertDocument(client, 'comments', newComment);
      console.log('result', result);
      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed' });
      return;
    }
  }
  if (req.method === 'GET') {
    let documents;
    try {
      documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get documents' });
    }
  }
  client.close();
}
