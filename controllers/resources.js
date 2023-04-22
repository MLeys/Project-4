import Resource from '../models/resource.js';
import Skill from '../models/skill.js';
import User from '../models/user.js';


export default {
  create,
	all: allResources,
	delete: deleteResources,
  deleteAllByVideoId: deleteAllByVideoId,

};


async function deleteAllByVideoId(req, res) {
  console.log(req, " <-- Delete all by video id in resource Controller")
  const videoId = req.params.videoId;

  try {
    const result = await Resource.deleteMany({ title: undefined });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "No resources found with the specified videoId" });
    } else {
      res.status(200).json({ message: `Deleted ${result.deletedCount} resources with videoId: ${videoId}` });
    }
  } catch (error) {
    console.error("Error deleting resources:", error);
    res.status(500).json({ error: "Error deleting resources" });
  }
}

async function create(req, res) {
	const user = await User.findById(req.body.userId)
	// const resourceData = {
	// 	title: req.body.title,
	// 	videoId: req.body.videoId,
	// 	description: req.body.description,
	// 	thumbnail: req.body.thumbnail,
	// 	datePublished: req.body.datePublished,
	// 	skillId: req.body.skillId,
	// 	subSkillId: req.body.subId,
	// 	user: user,
	// 	source: req.body.source,
	// }
  const skillId = req.body.skillId;
  const subId = req.body.subId;
  const resourceData = {
    title: req.body.title,
    videoId: req.body.videoId,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    datePublished: req.body.datePublished,
    skillId: req.body.skillId,
		subSkillId: req.body.subId,
    userId: req.body.userId,
    source: req.body.source,
  };
  try {
    const newResource = await Resource.create(resourceData);
    const skillDoc = await Skill.findById(skillId)
      .populate("usersAssigned")
      .populate("resources")
      .populate({
        path: "subSkills",
        populate: [
          {
            path: "resources",
            model: "Resource",
          },
          {
            path: "usersAssigned",
            model: "User",
          },
        ],
      });

    // Check if skillDoc is null and return an error message
    if (!skillDoc) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }

    // Find the index of the subSkill using subId
    const subIndex = skillDoc.subSkills.findIndex(
      (subSkill) => subSkill._id.toString() === subId
    );

    // Check if the subSkill is found
    if (subIndex === -1) {
      res.status(404).json({ message: "SubSkill not found" });
      return;
    }

    // Check if the resource is already included in the subSkill
    const resourceExists = skillDoc.subSkills[subIndex].resources.some(
      (resource) => resource._id.toString() === newResource._id.toString()
    );

    // If the resource is not included, add it to the subSkill
    if (!resourceExists) {
      skillDoc.subSkills[subIndex].resources.push(newResource);
    } else {
      res.status(400).json({ message: "Resource already exists in subSkill" });
      return;
    }

    await skillDoc.save();

    res.status(201).json(newResource.toJSON());
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ message: "Error creating resource" });
  }
}



async function allResources(req, res) {
  try {
	const resources = await Resource.find({}).populate("usersAssigned").exec(); // populating on the model
	res.status(200).json({ data: resources });
  } catch (err) {
	res.status(400).json({ err });
  }
}

async function deleteResources(req, res) {
  try {
    console.log(req.params, "Resource doc params for delete")
    const resourceDoc = await Resource.findById(req.params.id)
    console.log(resourceDoc, "<--- Resource on Delete")
    // resourceDoc.remove(req.params.id)
		
		await Resource.deleteOne({_id: req.params.id})
    

    res.status(201).json({resourceDoc})
  } catch (err) {
    console.log(err, '<-- Error in deleteResource.Ctrl')
    res.status(400).json({err})
  }
}
