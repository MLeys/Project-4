import mongoose from "mongoose";
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
    userCreated:  {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    title: String,
    skill:  {type: Schema.Types.ObjectId, ref: 'Skill', autopopulate: true},
    source: String,
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User', autopopulate: true}],
    keywords: [String]
}, {
    timestamps: true
})