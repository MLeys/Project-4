import User from '../models/user.js'
import Skill from '../models/skill.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME

import {s3} from '../config/s3-config.js'
import { v4 as uuidv4 } from 'uuid';


console.log(BUCKET_NAME, 'bucketname')


export default {
  signup,
  login,
  profile
};


async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
    // Then find all the skills that belong to that user
    if(!user) return res.status(404).json({error: 'User not found'})

    const skills = await Skill.find({user: user._id}).populate("user").exec();
    console.log(skills, ' this skills')
    res.status(200).json({data: skills, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}



async function signup(req, res) {
  console.log(req.body, " <- contents of the form", req.file, ' <- this is req.file')

  if(!req.file) return res.status(400).json({error: "Please Submit a Photo"})

  // where we will store our image on aws s3 bucket
  const filePath = `skillmap/${uuidv4()}-${req.file.originalname}`
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // req.file.buffer is the actually from the form when it was sent to our express server
  // s3.upload is making the request to s3
  s3.upload(params, async function(err, data){ // < inside the function in the response from aws
    if(err){
      console.log('===============================')
      console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
      console.log('===============================')
      res.status(400).json({error: 'error from aws, check your terminal'})
    }


    const user = new User({...req.body, photoUrl: data.Location}); // data.Location is the url for your image on aws
    try {
      await user.save(); // user model .pre('save') function is running which hashes the password
      const token = createJWT(user);
      res.json({ token }); // set('toJSON',) in user model is being called, and deleting the users password from the token
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }

  }) // end of the s3 callback
} // end of signup


async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(User.find(), '< Find USER *********')
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    await user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        console.log("*********** MATCHED CREATING TOKEN ************")
        const token = createJWT(user);
        res.json({token});
        console.log(token, ' RESJSON TOKEN AFTER LOGIN')
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}

