import express from 'express';
const router = express.Router();
import skillsCtrl  from '../../controllers/skills.js';

// *================= PUBLIC ROUTES ================*
router.get('/', skillsCtrl.index)
router.post('/createInitial', skillsCtrl.createInitial)
router.post('/', skillsCtrl.create)

router.delete('/:id', skillsCtrl.delete)
router.post('/:id', skillsCtrl.assignUser)
router.put('/:id', skillsCtrl.unAssignUser)
router.get('/all/:id', skillsCtrl.all)
router.get('/:id', skillsCtrl.show)






export default router;