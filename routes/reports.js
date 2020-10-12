const express = require('express');
const {
  createReport,
  getReports,
  getMyReports,
  getReport,
  updateReport,
  deleteReport,
} = require('../controllers/reportsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createReport);
router.get('/', [protect, authorize('admin')], getReports);
router.get('/my', protect, getMyReports);
router.get('/:id', protect, getReport);
router.put('/:id', protect, updateReport);
router.delete('/:id', protect, deleteReport);

module.exports = router;
