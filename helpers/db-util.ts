import { MongoClient } from 'mongodb';

export async function connectMongoDB() {
  const client = await MongoClient.connect(
    'mongodb+srv://olegtabachnikow:s0PXFLAKpIx4DWWd@mystudycluster.bilewxg.mongodb.net/newsletter?retryWrites=true&w=majority'
  );
  return client;
}
export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: any
) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(
  client: MongoClient,
  collection: string,
  sort: any
) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
