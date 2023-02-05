import express from 'express';
const router = express.Router();
import subSkillsCrtl from '../../controllers/subSkills.js'


router.post('/skills/:id/subskills', subSkillsCrtl.create)

export default router;