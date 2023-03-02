import express from 'express';
const router = express.Router();
import resourcesCtrl  from '../../controllers/resources.js';

// *================= PUBLIC ROUTES ================*
// router.get('/', skillsCtrl.index)
router.post('/', resourcesCtrl.create)

// router.delete('/:id', skillsCtrl.delete)
// router.post('/:id', skillsCtrl.assignUser)
// router.put('/:id', skillsCtrl.unAssignUser)
// router.get('/all', skillsCtrl.all)
// router.get('/:id', skillsCtrl.show)






export default router;