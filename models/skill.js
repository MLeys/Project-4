import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subSkillSchema = Schema({
    parentSkill: String,
    title: String,
    details: String,
    progress: {type: Number, default: 0},
    complete: {type: Boolean, default: false},
    resources: [{type: Schema.Types.ObjectId, ref: 'Resource', autopopulate: true}],
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
    progress: {type: Number, default: 0},
    complete: {type: Boolean, default: false},
}, {
    timestamps: true
});

export default mongoose.model('Skill', skillSchema);
