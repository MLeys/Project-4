import Skill from '../models/skill.js'


export default {
    create,
    update
}

async function create(req, res){
    try {
        
        console.log(req.body.parentSkill._id, "))))))) REQ PARAM")
        const skill = await Skill.findById(req.body.parentSkill._id);
        skill.subSkills.push(req.body)
    
        // skill.subSkills.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await skill.save()// save it

        res.status(201).json({skill})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function update(req, res){
    try {
        console.log(req.params.id, "<-- update subskill params")
        console.log(req.body, "req.body update")
        
        const skill = await Skill.findOne({'subSkills._id': req.params.id})
        console.log(skill, "<--Update Subskill")
        const subskills = skill.subSkills
        console.log(subskills, "<- subskills")
        const subIndex = subskills.findIndex(s =>  s.id === req.params.id)
        
        skill.subSkills[subIndex].title = req.body.title
        skill.subSkills[subIndex].details = req.body.details
        

        await skill.save();
       


        // const subskill = await subskills.findById(req.params.id)
        // console.log(subskill, "<--- subskill")
        // const sub= await skill.subSkills.findById(req.params.id)

        // const skill = await Skill.findById(req.params.id);
        // skill.subSkills.push(req.body)
       
        // // skill.subSkills.push({username: req.user.username, userId: req.user._id}); //mutating a document
        // await skill.save()// save it

        res.status(201).json({skill})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}