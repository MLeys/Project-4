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
  const data = req.body;
  try {
    for (const item of data) {
      console.log(item.category, " <- item category");

      // Check if the skill already exists in the database
      let skill = await Skill.findOne({ name: item.category });

      if (!skill) {
        // Create a new skill if it doesn't exist
        skill = new Skill({
          name: item.category,
          type: item.category,
          subSkills: [],
        });
      }

      // Iterate over subcategories and create subskills
      for (const subcategory of item.subcategories) {
        const subSkillExists = skill.subSkills.some(
          (subSkill) => subSkill.title === subcategory
        );

        if (!subSkillExists) {
          skill.subSkills.push({
            parentSkill: item.category,
            title: subcategory,
          });
        }
      }

      // Save the skill to the database
      await skill.save();
    }
    res.status(201).json({ message: "Skills created/updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

async function deleteSkill(req, res) {
  try {
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
    
    skill.usersAssigned.push(req.body)
    skill.save()
    console.log(req.body, "<--assigned user in skills controler")
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
    console.log(skill.usersAssigned, "<--UNassigned user in skills controler")
    res.status(201).json({skill})
  } catch(err) {
    console.log(err, "<-- assign user controller error")
    res.status(400).json({err})
  }
}