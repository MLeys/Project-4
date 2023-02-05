import Skill from '../models/skill.js'



export default {
    create,
    
}

async function create(req, res){
    try {

        const skill = await Skill.findById(req.params.id);
        skill.subSkills.push(req.body)
       
        // skill.subSkills.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await skill.save()// save it

        res.status(201).json({skill})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

