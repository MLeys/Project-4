import User from "../models/user.js";
import Skill from '../models/skill.js';
import user from "../models/user.js";

export default {
  create,
  index,
  delete: deleteSkill,
  show,
  all: allSkills,
  assignUser,
  unAssignUser,
};

async function deleteSkill(req, res) {
  try {
    const skillDoc = await Skill.findOne({'skills._id': req.params.id})
    console.log(skillDoc, "<--- SkillDoC on Delete")
    skillDoc.remove(req.params.id)
    

    res.status(201).json({skillDoc})
  } catch (err) {
    console.log(err, '<-- Error in deleteSkill.Ctrl')
    res.status(400).json({err})
  }
}

async function create(req, res) {
    try {
      const skill = await Skill.create({
        name: req.body.name,
        type: req.body.type,
        usersAssigned: req.user._id,
        
      })

      await skill.populate('usersAssigned')// populating on a document "skill"
      res.status(201).json({skill})
    } catch(err){
      res.status(400).json({err})
    }
  }

async function index(req, res) {
  try {
    // this populates the user when you find the skills
    const skills = await Skill.find({}).populate("usersAssigned").exec(); // populating on the model
    res.status(200).json({ data: skills });
  } catch (err) {
    res.status(400).json({ err });
  }
}
async function allSkills(req, res) {
  try {
    // this populates the user when you find the skills
    const skills = await Skill.find({}).populate("usersAssigned").exec(); // populating on the model
    res.status(200).json({ data: skills });
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function show(req, res) {
  try {
    console.log(req.params.id, "<<<------ Req.PARAMS.id in skillSHOW")
    console.log(req.params, "<<<------ Req.PARAMS in skillSHOW")
    const skillDoc = await Skill.findOne({'skills._id': req.params.id})
    console.log(skillDoc, "<---skillDoc SHOW")
    
    

    res.status(201).json({skillDoc})
  } catch (err) {
    console.log(err, '<-- Error in deleteSkill.Ctrl')
    res.status(400).json({err})
  }
}

async function assignUser(req, res) {

  try {
    const skill = await Skill.findById(req.params.id)
    
    await skill.usersAssigned.push(req.body)
    skill.save()
    
    res.status(201).json({skill})
  } catch(err) {
    console.log(err, "<-- assign user controller error")
    res.status(400).json({err})
  }
}

async function unAssignUser(req, res) {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)
    
    skill.save()
    
    console.log(skill.usersAssigned, "<--UNassigned user in controler")
    res.status(201).json({skill})
  } catch(err) {
    console.log(err, "<-- assign user controller error")
    res.status(400).json({err})
  }
}