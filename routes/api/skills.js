import express from 'express';
const router = express.Router();
import skillsCtrl  from '../../controllers/skills.js';
import multer from 'multer'
const upload = multer();

// *================= PUBLIC ROUTES ================*

router.post('/', skillsCtrl.create)
router.get('/all', skillsCtrl.all)
router.get('/', skillsCtrl.index)
router.get('/:id', skillsCtrl.show)
router.delete('/:id', skillsCtrl.delete)

export default router;