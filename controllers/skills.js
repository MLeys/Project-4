import User from "../models/user.js";
import Skill from '../models/skill.js';
import S3 from "aws-sdk/clients/s3.js";
const s3 = new S3(); // initate the S3 constructor which can talk to aws/s3 our bucket!
// import uuid to help generate random names
import { v4 as uuidv4 } from "uuid";
// since we are sharing code, when you pull you don't want to have to edit the
// the bucket name, thats why we're using an environment variable
const BUCKET_NAME = process.env.BUCKET_NAME;

export default {
  create,
  index,
};

async function create(req, res) {
  // console.log(req.user, " <- req.user SKILL", req.body, req.file)

  // if(!req.file) return res.status(400).json({err: 'No file was submitted sKILL***'});

  // generate our key for our photo on aws
  // const key = `skillmap/skills/${uuidv4()}-${req.file.originalname}`;
  // const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer}
  // // upload image to aws
  // s3.upload(params, async function(err, data){
  //   console.log('========================')
  //   console.log(err, ' err from aws')
  //   console.log('========================')
  //   if (err) return res.status(400).json({err: 'Check terminal error from aws SKILL***'})

    try {
      // adding our skill information to the database
      const skill = await Skill.create({
        user: req.user._id,
        name: req.body.name,
        type: req.body.type,
      })
      console.log(skill, "<<<<<<<< SKILLS CONTROLLER")
      await Skill.populate('user')// populating on a document "skill"
      // respond to the client
      res.status(201).json({skill})

    } catch(err){
      res.status(400).json({err})
    }
  }
//   )// end of s3 upload  
// }

async function index(req, res) {
  try {
    // this populates the user when you find the skills
    const skills = await Skill.find({}).populate("user").exec(); // populating on the model
    res.status(200).json({ data: skills });
  } catch (err) {
    res.status(400).json({ err });
  }
}
