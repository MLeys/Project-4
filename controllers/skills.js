import User from "../models/user.js";
import Skill from '../models/skill.js';

export default {
  create,
  index,
};

async function create(req, res) {
    try {
      const skill = await Skill.create({
        user: req.user._id,
        name: req.body.name,
        type: req.body.type,
      })

      await skill.populate('user')// populating on a document "skill"
      res.status(201).json({skill})
    } catch(err){
      res.status(400).json({err})
    }
  }

async function index(req, res) {
  try {
    // this populates the user when you find the skills
    const skills = await Skill.find({}).populate("user").exec(); // populating on the model
    res.status(200).json({ data: skills });
  } catch (err) {
    res.status(400).json({ err });
  }
}
