import mongoose, { Schema, Document } from 'mongoose';

export interface ILeadDoc extends Document {
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const LeadSchema = new Schema<ILeadDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Lost'], 
    default: 'New' 
  },
  source: { 
    type: String, 
    enum: ['Website', 'Instagram', 'Referral'], 
    required: true 
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<ILeadDoc>('Lead', LeadSchema);