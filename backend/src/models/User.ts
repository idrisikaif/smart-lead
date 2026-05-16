import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'sales';
}

const UserSchema = new Schema<IUserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'sales'], default: 'sales' }
}, { timestamps: true });

export default mongoose.model<IUserDoc>('User', UserSchema);