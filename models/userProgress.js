import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userProgressSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    skill: {type: Schema.Types.ObjectId, ref: 'Skill', required: true},
    subSkillProgress: [{
        subSkillId: {type: Schema.Types.ObjectId, ref: 'SubSkill'},
        progress: {type: Number, default: 0},
        complete: {type: Boolean, default: false},
        resources: [{
            resourceId: {type: Schema.Types.ObjectId, ref: 'Resource'},
            complete: {type: Boolean, default: false}
        }]
    }],
    skillProgress: {type: Number, default: 0},
    skillComplete: {type: Boolean, default: false},
}, {
    timestamps: true
});

userProgressSchema.virtual('subSkillProgressPercentages').get(async function() {
  const subSkillProgress = await Promise.all(this.subSkillProgress.map(async subSkill => {
    const completedResources = await Resource.countDocuments({ subSkillId: subSkill.subSkillId, complete: true, usersAssigned: this.user });
    const totalResources = await Resource.countDocuments({ subSkillId: subSkill.subSkillId, usersAssigned: this.user });
    const percentage = totalResources > 0 ? (completedResources / totalResources) * 100 : 0;
    return { subSkillId: subSkill.subSkillId, percentage };
  }));
  return subSkillProgress;
});

userProgressSchema.virtual('resourceProgressPercentage').get(function() {
    const resources = this.subSkillProgress.reduce((acc, subSkill) => {
        return acc.concat(subSkill.resources);
    }, []);
    const completedResources = resources.filter(resource => resource.complete).length;
    const totalResources = resources.length;
    return (completedResources / totalResources) * 100;
});

userProgressSchema.virtual('skillProgressPercentage').get(function() {
    const completedSubSkills = this.subSkillProgress.filter(subSkill => subSkill.complete).length;
    const totalSubSkills = this.subSkillProgress.length;
    return (completedSubSkills / totalSubSkills) * 100;
});

userProgressSchema.statics.getAccumulatedProgress = async function (userId) {
  const userProgressDocuments = await this.find({ user: userId });

  const totalSkills = userProgressDocuments.length;
  let completedSkills = 0;
  let accumulatedProgress = 0;

  for (const userProgress of userProgressDocuments) {
    const subSkillPercentages = await userProgress.subSkillProgressPercentages;
    const skillProgress = subSkillPercentages.reduce((acc, subSkill) => acc + subSkill.percentage, 0) / subSkillPercentages.length;

    if (userProgress.skillComplete) {
      completedSkills += 1;
    }

    accumulatedProgress += skillProgress;
  }

  const averageProgress = accumulatedProgress / totalSkills;
  const completionPercentage = (completedSkills / totalSkills) * 100;

  return {
    totalSkills,
    completedSkills,
    averageProgress,
    completionPercentage,
  };
};


export default mongoose.model('UserProgress', userProgressSchema);
