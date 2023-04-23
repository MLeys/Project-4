import Skill from '../models/skill.js';
import User from '../models/user.js';


export default {
    create,
    update,
    assignUser,
    unAssignUser,
}

async function unAssignUser(req, res) {
    console.log(req.body._id, " unassign req body._id")
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    try {
      const resource = await Resource.findById(req.params.id).populate("usersAssigned")
  
      // const userAssignedIndex = resource.usersAssigned.Of(req.body._id)
      
      // resource.usersAssigned.splice(userAssignedIndex, 1);
      // await resource.save();
  
      console.log(resource, " REsource doc after Unassigning user")
      res.status(201).json({resource})
    } catch(err) {
      console.log(err, "<-- assign user to resource controller error")
      res.status(400).json({err})
    }
  }
  
  async function assignUser(req, res) {
    try {
      const resource = await Resource.findById(req.params.id).populate("usersAssigned")
      const user = await User.findById(req.body._id)
      
      resource.usersAssigned.splice(0,0, user);
      await resource.populate("usersAssigned");
      await resource.save();
      console.log(resource, " REsource doc after assigning user")
  
      res.status(201).json({resource})
    } catch(err) {
      console.log(err, "<-- assign user to resource controller error")
      res.status(400).json({err})
    }
  }

async function create(req, res){
    try {
        const skill = await Skill.findById(req.body.parentSkill._id);
        skill.subSkills.push(req.body);
    
        await skill.save()
        res.status(201).json({skill})
    } catch(err){
        console.log(err, "<== Create SubSkill Error")
        res.status(400).json({err})
    }
}

async function update(req, res){
    try {
        const skill = await Skill.findOne({'subSkills._id': req.params.id})
        const subIndex =skill.subSkills.findIndex(s =>  s.id === req.params.id)
        
        skill.subSkills[subIndex].title = req.body.title
        skill.subSkills[subIndex].details = req.body.details

        await skill.save();
        res.status(201).json({skill})
    } catch(err){
        res.status(400).json({err})
    }
}