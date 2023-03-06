import Resource from '../models/resource.js';
import skill from '../models/skill.js';
import Skill from '../models/skill.js';

export default {
  create,
	all: allResources,

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
		.populate("usersAssigned")
		.populate("resources")
		.populate({
			path: 'subSkills',
			populate: [
				{
					path: 'resources',
					model: 'Resource'
				},
				{
					path: 'usersAssigned',
					model: 'User'
				}
			]
		});
	
		// const subDoc = await skillDoc.subSkills.findById(subId)
		// 	.populate("usersAssigned")
		// 	.populate("resources")
		// 	.exec();
		const subDoc = await skillDoc.subSkills[subIndex]
	
		console.log(subDoc, '<= subDoc')
	
		skillDoc.resources.splice(0,0, newResource);
		await skillDoc.subSkills[subIndex].resources.splice(0,0, newResource)
	

		await skillDoc.save();
		console.log(skillDoc, "Final skilldoc")
	
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
