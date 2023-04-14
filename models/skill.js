import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subSkillSchema = Schema({
    parentSkill: String,
    title: String,
    details: String,
    resources: [{type: Schema.Types.ObjectId, ref: 'Resource', autopopulate: true}],
    usersAssigned: [String],
}, {
    timestamps: true
})


const skillSchema = new Schema({
    // usergt : {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    name: {type: String, required: true, unique: true},
    type: String,
    usersAssigned: [String],
    subSkills: [subSkillSchema],
    resources: [{type: Schema.Types.ObjectId, ref: 'Resource', autopopulate: true}],

}, {
    timestamps: true
})

export default mongoose.model('Skill', skillSchema)
// export default mongoose.model('SubSkill', subSkillSchema)