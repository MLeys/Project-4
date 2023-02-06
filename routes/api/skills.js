import express from 'express';
const router = express.Router();
import skillsCtrl  from '../../controllers/skills.js';
import multer from 'multer'
const upload = multer();

// *================= PUBLIC ROUTES ================*

router.post('/', skillsCtrl.create)

router.get('/', skillsCtrl.index)


router.delete('/:id', skillsCtrl.delete)
router.put('/:id', skillsCtrl.assignUser)
router.put('/:id', skillsCtrl.unAssignUser)
router.get('/all', skillsCtrl.all)
router.get('/:id', skillsCtrl.show)






export default router;