import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subSkillSchema = Schema({
    username: String,
    details: String,
    resources: [{type: Schema.Types.ObjectId, ref: 'Resource'}],
})


const skillSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    type: String,
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User', autopopulate: true}],
    allResources: [{type: Schema.Types.ObjectId, ref: 'Resource', autopopulate: true}],
    subSkill: [{subSkillSchema}],

})