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
	console.log("==================================== ")
	console.log(" === HITTING CREATE RESOURCES CTRL ====")
	console.log("==================================== ")
	console.log(req.body, "<<<< REQ BODY")
	const skillId = req.body.skillId;
	const subId = req.body.subId
	const subIndex = req.body.subIndex;
	const resourceData = {
		title: req.body.title,
		videoId: req.body.videoId,
		description: req.body.description,
		thumbnail: req.body.thumbnail,
		datePublished: req.body.datePublished,
		skillId: req.body.skillId,
		userId: req.body.userId,
		source: req.body.source,
	}
	console.log(resourceData, "<= resource data")

	try {
		const newResource = await Resource.create(resourceData)
		const skillDoc = await Skill.findById(skillId)
	
		const subDoc = await skillDoc.subSkills[subIndex]
		console.log(subDoc, '<= subDoc')
	
		await subDoc.resources.splice(0,0, newResource);
		// await skillDoc.populate("subSkills").populate("usersAssigned").exec();
		// await subDoc.populate("resources").populate("usersAssigned").exec();

		subDoc.save();
		skillDoc.save();

		res.status(201).json(newResource.toJSON());
	} catch (error) {
		console.error("Error creating resource:", error);
		res.status(500).json({ message: "Error creating resource" });
	}
};

`doc.populate("arr.0.path")`

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