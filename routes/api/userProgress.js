import express from 'express';
import * as userProgress from '../controllers/userProgress';

const router = express.Router();

router.get('/:userId', userProgressController.getUserProgress);
router.post('/assign-skill/:userId/:skillId', userProgressController.assignSkill);
router.patch('/update-resource-completion/:userId/:subSkillId/:resourceId', userProgressController.updateResourceCompletion);
router.get("/accumulated-progress", userProgressController.getAccumulatedUserProgress);


export default router;
