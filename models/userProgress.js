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

userProgressSchema.virtual('subSkillProgressPercentage').get(function() {
    if (!this.subSkillProgress) return 0;
    const completedResources = this.subSkillProgress.resources.filter(resource => resource.complete).length;
    const totalResources = this.subSkillProgress.resources.length;
    return (completedResources / totalResources) * 100;
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
    if (userProgress.skillComplete) {
      completedSkills += 1;
    }
    accumulatedProgress += userProgress.skillProgress;
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
