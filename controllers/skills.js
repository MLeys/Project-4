import User from "../models/user.js";
import Skill from '../models/skill.js';


export default {
  create,
  delete: deleteSkill,
  show,
  all: allSkills,
  assignUser,
  unAssignUser,
  createInitial
};


// TEMP for creating initial skills from hard coded list
async function createInitial(req, res) {
  const { skillsList } = req.body;
  console.log(skillsList, ' skill list crtl')

  try {
    const createdSkills = [];

    for (const skillData of skillsList) {
      const skill = new Skill({
        name: skillData.category,
        type: skillData.category,
        usersAssigned: [],
        subSkills: [],
        resources: [],
      });

      const savedSkill = await skill.save();
      createdSkills.push(savedSkill);

      const subSkills = skillData.subcategories.map((subSkillData) => ({
        parentSkill: savedSkill._id,
        title: subSkillData,
        details: '',
        resources: [],
        usersAssigned: [],
      }));

      savedSkill.subSkills = subSkills;
      await savedSkill.save();
      console.log(savedSkill, ' saved skill')
    }

    console.log('created skills')
    res.status(201).json({createdSkills});
  } catch (error) {
    res.status(400).json({ message: 'Error creating skills and subskills', error });
  }
};



async function deleteSkill(req, res) {
  try {
    const skillDoc = await Skill.findById(req.params.id)
    // console.log(skillDoc, "<--- SkillDoC on Delete")
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
        title: req.body.title,
        type: req.body.type,
      })

      res.status(201).json({skill})
    } catch(err){
      res.status(400).json({err})
    }
  }

async function allSkills(req, res) {
  try {
    console.log("allskills ctrl");
    const skills = await Skill.find()
      .populate("usersAssigned", "User")
      .populate({
        path: "subSkills.resources",
        model: "Resource",
      })
      .populate({
        path: "subSkills.usersAssigned",
        model: "User",
      })
      .populate("resources", "Resource")
      .exec();

    const userSkills = skills.filter((skill) => {
      return skill.usersAssigned.some(
        (user) => user._id.toString() === req.params.id
      );
    });

    const firstSkillIndex = skills.findIndex(
      (skill) => skill._id?.toString() === userSkills[0]?._id.toString()
    );

    res.status(200).json({
      skills: skills,
      userSkills: userSkills,
      firstSkillIndex: firstSkillIndex,
    });
  } catch (err) {
    console.log(err, '<--- Error from GET allSkills')
    res.status(400).json({ err });
  }
}

async function show(req, res) {
  try {
    const skillDoc = await Skill.findOne({'title': req.params.id}).exec()
    res.status(201).json({skillDoc})
  } catch (err) {
    console.log(err, '<-- Error in SHOW Ctrl')
    res.status(400).json({err})
  }
}

async function assignUser(req, res) {
  try {
    const skill = await Skill.findById(req.params.id)
    
    skill.usersAssigned.push(req.body)
    skill.save()
    // console.log(req.body, "<--assigned user in skills controler")
    res.status(201).json({skill})
  } catch(err) {
    console.log(err, "<-- assign user in skills controller error")
    res.status(400).json({err})
  }
}

async function unAssignUser(req, res) {
  try {
    const skill = await Skill.findById(req.params.id);
    const userId = (req.body._id)
    const index = skill.usersAssigned.indexOf(userId);

    skill.usersAssigned.splice(index, 1);
    skill.save()
    // console.log(skill.usersAssigned, "<--UNassigned user in skills controler")
    res.status(201).json({skill})
  } catch(err) {
    console.log(err, "<-- assign user controller error")
    res.status(400).json({err})
  }
}