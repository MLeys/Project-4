import express from 'express';
const router = express.Router();
import skillsCtrl  from '../../controllers/skills.js';
import multer from 'multer'
const upload = multer();

// *================= PUBLIC ROUTES ================*

router.post('/', skillsCtrl.create)
router.get('/', skillsCtrl.index)

export default router;