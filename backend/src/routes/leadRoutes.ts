import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  exportCSV
} from '../controllers/leadController';
import { protect, adminOnly } from '../middleware/auth';
import { validateLead } from '../middleware/validate';

const router = Router();

router.use(protect);

router.get('/export', exportCSV);
router.get('/', getLeads);
router.get('/:id', getLead);
router.post('/', validateLead, createLead);
router.put('/:id', updateLead);
router.delete('/:id', adminOnly, deleteLead);

export default router;