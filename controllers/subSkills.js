import Skill from '../models/skill.js'


export default {
    create,
    update
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

async function update(req, res){
    try {
        const skill = await Skill.findOne({'subSkills._id': req.params.id})
        const subIndex =skill.subSkills.findIndex(s =>  s.id === req.params.id)
        
        skill.subSkills[subIndex].title = req.body.title
        skill.subSkills[subIndex].details = req.body.details

        await skill.save();
        res.status(201).json({skill})
    } catch(err){
        res.status(400).json({err})
    }
}