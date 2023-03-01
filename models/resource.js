import mongoose from "mongoose";
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
    // userCreated:  {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    title: String,
    videoId: String,
    description: String,
    thumbnail: String,
    datePublished: String,
    parentSkillId:  {type: Schema.Types.ObjectId, ref: 'Skill', autopopulate: true},
    parentSubSkillName, String,
    source: {type: String, default: 'youtube'},
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User', autopopulate: true}],
    // 
}, {
    timestamps: true
})