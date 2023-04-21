import UserProgress from '../models/userProgress.js';
import Skill from '../models/skill.js';
import User from '../models/user.js';


export default {
  getAccumulatedUserProgress,
  getUserProgress,
  assignSkill,
  updateResourceCompletion
};


async function getAccumulatedUserProgress(req, res) {
  try {
    const userId = req.user._id;
    const accumulatedProgress = await UserProgress.getAccumulatedProgress(userId);
    res.status(200).json(accumulatedProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getUserProgress(req, res) {
  try {
    const userProgress = await UserProgress.findOne({ userId: req.params.userId }).populate('skills.skill');
    res.json(userProgress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Error fetching user progress' });
  }
};

async function assignSkill(req, res) {
  console.log(`Assign Skill Controller`);
  try {
    const { userId, skillId } = req.params;
    const skill = await Skill.findById(skillId);

    if (!skill) {
      res.status(404).json({ error: 'Skill not found' });
      return;
    }

    let userProgress = await UserProgress.findOne({ user: userId, skill: skillId });

    if (!userProgress) {
      const subSkillProgress = skill.subSkills.map(subSkill => ({
        subSkillId: subSkill._id,
        progress: 0,
        complete: false,
        resources: []
      }));

      userProgress = await UserProgress.create({
        user: userId,
        skill: skillId,
        subSkillProgress,
        skillProgress: 0,
        skillComplete: false,
      });

      res.json(userProgress);
    } else {
      res.status(400).json({ error: 'User has already been assigned this skill' });
    }
  } catch (error) {
    console.error('Error assigning skill:', error);
    res.status(500).json({ error: 'Error assigning skill' });
  }
}


async function updateResourceCompletion(req, res) {
  try {
    const { userId, subSkillId, resourceId } = req.params;
    const complete = req.body.complete;

    const userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      res.status(404).json({ error: 'User progress not found' });
      return;
    }

    const skillProgress = userProgress.skills.find(skill => skill.subSkills.some(subSkill => subSkill.subSkillId == subSkillId));
    const subSkillProgress = skillProgress.subSkills.find(subSkill => subSkill.subSkillId == subSkillId);
    const resourceProgress = subSkillProgress.resources.find(resource => resource.resourceId == resourceId);

    if (!resourceProgress) {
      subSkillProgress.resources.push({
        resourceId,
        complete
      });
    } else {
      resourceProgress.complete = complete;
    }

    // Update subSkill and skill progress based on resource completion
    // ...

    await userProgress.save();

    res.json(userProgress);
  } catch (error) {
    console.error('Error updating resource completion:', error);
    res.status(500).json({ error: 'Error updating resource completion' });
  }
};
