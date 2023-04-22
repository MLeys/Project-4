import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subSkillSchema = Schema({
    parentSkill: String,
    title: String,
    details: String,
    resources: [{type: Schema.Types.ObjectId, ref: 'Resource'}],
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
    timestamps: true
});

const skillSchema = new Schema({
    name: {type: String, required: true, unique: true},
    type: String,
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User'}],
    subSkills: [subSkillSchema],
    resources: [{type: Schema.Types.ObjectId, ref: 'Resource', autopopulate: true}],
}, {
    timestamps: true
});

export default mongoose.model('Skill', skillSchema);
