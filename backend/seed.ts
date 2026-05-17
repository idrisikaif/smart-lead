import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const names = ['Rahul Sharma', 'Priya Singh', 'Amit Kumar', 'Neha Gupta', 'Rohit Verma', 'Anjali Mehta', 'Vikram Patel', 'Pooja Joshi', 'Arjun Rao', 'Sneha Nair'];
const sources = ['Website', 'Instagram', 'Referral'];
const statuses = ['New', 'Contacted', 'Qualified', 'Lost'];

const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/smartleads');
  
  const db = mongoose.connection.db!;
  const leads = [];

  for (let i = 0; i < 500; i++) {
    leads.push({
      name: `${random(names)} ${i}`,
      email: `lead${i}@example.com`,
      status: random(statuses),
      source: random(sources),
      createdBy: new mongoose.Types.ObjectId('6a084417cee67b33fcd3bb4d'),
      createdAt: new Date(Date.now() - Math.random() * 10000000000),
      updatedAt: new Date()
    });
  }

  await db.collection('leads').insertMany(leads);
  console.log('500 leads inserted!');
  process.exit(0);
}

seed();