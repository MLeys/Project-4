import Resource from '../models/resource.js';
import Skill from '../models/skill.js';

export default {
  create,
	all: allResources,
//   index,
//   delete: deleteSkill,
//   show,

//   assignUser,
//   unAssignUser,
};

async function create(req, res) {
	console.log(req.body, "<<<< REQ BODY")

	try {
		
		const newResource = await (await Resource.create(req.body))
		const skillDoc = await Skill.findById(req.body.skillId).populate("resources").exec();
			// .resources.push(newResource)
			// .populate("resources")
			// .exec()
			// .save()
   
		skillDoc.resources.push(newResource);
		console.log('===========================START========================')
		console.log('===================================================')

		console.log(newResource)
	   
		console.log('================================END===================')
		console.log('===================================================')

		skillDoc.save();

		console.log("skillDoc: ",skillDoc)
		// const subSkills = skillDoc.resources.push(newResource)
		// console.log(`subSkills: ${subSkills}`)
		

		console.log(`NewResource(ctrl): \n${newResource}`)
		res.status(201).json(newResource.toJSON());
	} catch (error) {
		console.error("Error creating resource:", error);
		res.status(500).json({ message: "Error creating resource" });
	}
};

async function allResources(req, res) {
  try {
	const resources = await Resource.find({}).populate("usersAssigned").exec(); // populating on the model
	res.status(200).json({ data: resources });
  } catch (err) {
	res.status(400).json({ err });
  }
}

// async function deleteSkill(req, res) {
//   try {
//     console.log(req.params, "Skill doc params for delete")
//     const skillDoc = await Skill.findById(req.params.id)
//     console.log(skillDoc, "<--- SkillDoC on Delete")
//     skillDoc.remove(req.params.id)
	

//     res.status(201).json({skillDoc})
//   } catch (err) {
//     console.log(err, '<-- Error in deleteSkill.Ctrl')
//     res.status(400).json({err})
//   }
// }



// async function index(req, res) {
//   try {
//     // this populates the user when you find the skills
//     const skills = await Skill.find({}).populate("usersAssigned").exec(); // populating on the model
//     res.status(200).json({ data: skills });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// }


// async function show(req, res) {
//   try {
//     const skillDoc = await Skill.findOne({'name': req.params.id}).exec()

  

//     res.status(201).json({skillDoc})
//   } catch (err) {
//     console.log(err, '<-- Error in SHOW Ctrl')
//     res.status(400).json({err})
//   }
// }

// async function assignUser(req, res) {

//   try {
//     const skill = await Skill.findById(req.params.id)
	
//     await skill.usersAssigned.push(req.body)
//     skill.save()
	
//     res.status(201).json({skill})
//   } catch(err) {
//     console.log(err, "<-- assign user controller error")
//     res.status(400).json({err})
//   }
// }

// async function unAssignUser(req, res) {
//   try {
//     const skill = await Skill.findById(req.params.id);
//     const index = skill.usersAssigned.indexOf(req.user._id);

//     skill.usersAssigned.splice(index, 1);

//     skill.save()
	
//     console.log(skill.usersAssigned, "<--UNassigned user in controler")
//     res.status(201).json({skill})
//   } catch(err) {
//     console.log(err, "<-- assign user controller error")
//     res.status(400).json({err})
//   }
// }