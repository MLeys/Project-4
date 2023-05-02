import Skill from '../models/skill.js';
import User from '../models/user.js';


export default {
  create,
  assignUser,
  unAssignUser,
  updateSubSkill,
  deleteSubSkill,
}


async function assignUser(req, res) {
  const subSkillId = req.body.subSkill?._id;
  const skillId = req.body.parentSkillId;
  const user = await User.findById(req.body.user._id);
  // console.log(subSkillId, ' subskillid')
  // console.log(req.body.id, ' req body id')
  // console.log(req.body.parentSkillId, ' req body bodyskillid')
  // console.log(user.username, "users username being assigned")
  // console.log(req.body, " - req body")
  

  try {
    const skillDoc = await Skill.findById(skillId)
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

    // console.log(skillDoc, "<-- skill doc")
    // Find the index of the subSkill
    const subSkillIndex = skillDoc?.subSkills?.findIndex((sub) => sub._id.equals(subSkillId));

    if (subSkillIndex === -1) {
      return res.status(404).json({ error: "Sub-skill not found" });
    }

    // Check if the user is already assigned
    const isUserAssigned = await skillDoc.subSkills[subSkillIndex]?.usersAssigned.some((assignedUser) => assignedUser._id.equals(user._id));

    // Update the usersAssigned array for the subSkill if the user is not already assigned
    if (!isUserAssigned) {
      skillDoc.subSkills[subSkillIndex].usersAssigned = [user, ...skillDoc.subSkills[subSkillIndex].usersAssigned];
      await skillDoc.save();
    }

    res.status(201).json({ subSkill: skillDoc.subSkills[subSkillIndex] });

  } catch (err) {
    console.log(err, "<-- assign user to resource controller error");
    res.status(400).json({ error: err.message });
  }
}





// Data needed: parentSkillId, user, subSkillId
async function unAssignUser(req, res) {
  const subSkillId = req.params.id;
  const skillId = req.body.parentSkillId;
  const user = req.body.user;
  console.log('unassign controller')
  try {
    const skillDoc = await Skill.findById(skillId)
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

    const subSkillIndex = skillDoc.subSkills.findIndex((sub) => sub._id.equals(subSkillId));

    if (subSkillIndex === -1) {
      return res.status(404).json({ error: "Sub-skill not found" });
    }

  
    // Check if the user is already assigned
    const isUserAssigned = await skillDoc.subSkills[subSkillIndex].usersAssigned.some((assignedUser) => assignedUser._id.equals(user._id));

    if (isUserAssigned) {
      skillDoc.subSkills[subSkillIndex].usersAssigned.splice(user, 1)
      await skillDoc.save();   
    }
    const subSkillDoc =  await skillDoc.subSkills[subSkillIndex];



    res.status(200).json({ subSkill: subSkillDoc });
  } catch (err) {
    console.log(err, "<-- unassign user from subSkill controller error");
    res.status(400).json({ error: err.message });
  }
}

// Data needed: parentSkillId, subSkillId, updatedSubSkill
async function updateSubSkill(req, res) {
  const subSkillId = req.params.id;
  const skillId = req.body.parentSkillId;
  const updatedSubSkill = req.body.updatedSubSkill;

  try {
    const skillDoc = await Skill.findById(skillId);

    const subSkillDoc = skillDoc.subSkills.find((sub) => sub._id === subSkillId);

    if (!subSkillDoc) {
      return res.status(404).json({ error: "Sub-skill not found" });
    }

    subSkillDoc.set(updatedSubSkill);

    await skillDoc.save();

    res.status(200).json({ subSkill: subSkillDoc });
  } catch (err) {
    console.log(err, "<-- update subSkill controller error");
    res.status(400).json({ error: err.message });
  }
}

// Data needed: parentSkillId, subSkillId
async function deleteSubSkill(req, res) {
  const subSkillId = req.params.id;
  const skillId = req.body.parentSkillId;

  try {
    const skillDoc = await Skill.findById(skillId);

    const subSkillIndex = skillDoc.subSkills.findIndex((sub) => sub._id === subSkillId);

    if (subSkillIndex === -1) {
      return res.status(404).json({ error: "Sub-skill not found" });
    }

    skillDoc.subSkills.splice(subSkillIndex, 1);

    await skillDoc.save();

    res.status(200).json({ message: "Sub-skill deleted successfully" });
  } catch (err) {
    console.log(err, "<-- delete subSkill controller error");
    res.status(400).json({ error: err.message });
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

// async function update(req, res){
//     try {
//         const skill = await Skill.findOne({'subSkills._id': req.params.id})
//         const subIndex =skill.subSkills.findIndex(s =>  s.id === req.params.id)
        
//         skill.subSkills[subIndex].title = req.body.title
//         skill.subSkills[subIndex].details = req.body.details

//         await skill.save();
//         res.status(201).json({skill})
//     } catch(err){
//         res.status(400).json({err})
//     }
// }