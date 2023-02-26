import mongoose from "mongoose";
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
    // userCreated:  {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    title: String,
    parentSkillId:  {type: Schema.Types.ObjectId, ref: 'Skill', autopopulate: true},
    parentSubSkillName, String,
    source: String,
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User', autopopulate: true}],
    // 
}, {
    timestamps: true
})