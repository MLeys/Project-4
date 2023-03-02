import mongoose from "mongoose";
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
    // userCreated:  {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    title: String,
    videoId: String,
    description: String,
    thumbnail: String,
    datePublished: String,
    skillId: String,
    subSkillId: String,
    source: {type: String, default: 'youtube'},
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User', autopopulate: true}],
    // 
}, {
    timestamps: true
})
export default mongoose.model('Resource', resourceSchema)