import express from 'express';
const router = express.Router();
import subSkillsCrtl from '../../controllers/subSkills.js'


router.post('/skills/:id/subskills', subSkillsCrtl.create)
router.put('/skills/:id/subskills/update', subSkillsCrtl.update)

export default router;