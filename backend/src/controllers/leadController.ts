import { Response } from 'express';
import { Parser } from 'json2csv';
import Lead from '../models/Lead';
import { AuthRequest } from '../types';

export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.create({ ...req.body, createdBy: req.user?.id });
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, source, search, sort, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOrder = sort === 'oldest' ? 1 : -1;
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const exportCSV = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find({});
    const fields = ['name', 'email', 'status', 'source', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(leads.map(l => l.toObject()));

    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};