import express from 'express';
const router = express.Router();
import subSkillsCrtl from '../../controllers/subSkills.js'

router.post('/subskills/:id', skillsCtrl.assignUser)
router.put('/subskills/:id', skillsCtrl.unAssignUser)
router.post('/skills/:id/subskills', subSkillsCrtl.create)
router.put('/subskills/:id/update', subSkillsCrtl.update)

export default router;

// router.post('/createInitial', skillsCtrl.createInitial)
// router.post('/', skillsCtrl.create)

// router.delete('/:id', skillsCtrl.delete)
// router.post('/:id', skillsCtrl.assignUser)
// router.put('/:id', skillsCtrl.unAssignUser)
// router.get('/all/:id', skillsCtrl.all)
// router.get('/:id', skillsCtrl.show)