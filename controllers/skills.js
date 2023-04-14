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
  createInitial
};

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

  //  [1] [
  // [1]   {
  // [1]     category: 'Programming Languages',
  // [1]     subcategories: [ 'Java', 'Python', 'JavaScript', 'Rust' ]
  // [1]   },
  // [1]   {
  // [1]     category: 'Functional Programming',
  // [1]     subcategories: [
  // [1]       'Regular Expressions (RegEx)',
  // [1]       'Sorting Algorithms',
  // [1]       'Searching Algorithms'
  // [1]     ]
  // [1]   }
  // [1] ]
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