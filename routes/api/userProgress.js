import express from 'express';
import userProgressCtrl from '../../controllers/userProgress.js'

const router = express.Router();

router.get('/:userId', userProgressCtrl.getUserProgress);
router.post('/assign-skill/:userId/:skillId', userProgressCtrl.assignSkill);
router.patch('/update-resource-completion/:userId/:subSkillId/:resourceId', userProgressCtrl.updateResourceCompletion);
router.get("/accumulated-progress", userProgressCtrl.getAccumulatedUserProgress);


export default router;
