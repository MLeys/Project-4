import User from "../models/user.js";
import Skill from '../models/skill.js';

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
    console.log(req.params, "Skill doc params for delete")
    const skillDoc = await Skill.findById(req.params.id)
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
        // usersAssigned: req.user._id,
        
      })

      // await skill.populate('usersAssigned')// populating on a document "skill"
      res.status(201).json({skill})
    } catch(err){
      res.status(400).json({err})
    }
  }

async function index(req, res) {
  try {
    console.log(" HITTING INDEX NOT ALL SKILLS")
    // this populates the user when you find the skills
    const skills = await Skill.find({}).populate("usersAssigned").exec(); // populating on the model
    res.status(200).json({ data: skills });
  } catch (err) {
    res.status(400).json({ err });
  }
}
async function allSkills(req, res) {
  try {
    console.log("allskills ctrl")
    const skills = await Skill.find()
    .populate({
      path: "usersAssigned",
      model: "User"
    })
    .populate({
      path: "subSkills.parentSkill",
      model: "Skill"
    })
    .populate({
      path: "subSkills.resources",
      model: "Resource"
    })
    .populate({
      path: "subSkills.usersAssigned",
      model: "User"
    })
    .populate({
      path: "resources",
      model: "Resource"
    })
    .exec();

    const userSkills = skills.filter(skill => {
      return skill.usersAssigned.some(user => user._id.toString() === req.params.id);
    })
    ;
    // console.log(skills[0]," skills[0]")
    // console.log(userSkills[0], "<==== userSkills[0]0 from controller filter at getAll")
    
    // find cooresponding skill index inskilsl of the userskill at [0] and match to cooresponsing 
    const firstSkillIndex = skills.findIndex(skill => skill._id === userSkills[0]._id)
    
    
    res.status(200).json({ skills: skills, userSkills: userSkills, firstSkillIndex: firstSkillIndex });
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function show(req, res) {
  try {
    const skillDoc = await Skill.findOne({'name': req.params.id}).exec()

  

    res.status(201).json({skillDoc})
  } catch (err) {
    console.log(err, '<-- Error in SHOW Ctrl')
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
    const skill = await Skill.findById(req.params.id);
    const index = skill.usersAssigned.indexOf(req.user._id);

    skill.usersAssigned.splice(index, 1);

    skill.save()
    
    console.log(skill.usersAssigned, "<--UNassigned user in controler")
    res.status(201).json({skill})
  } catch(err) {
    console.log(err, "<-- assign user controller error")
    res.status(400).json({err})
  }
}