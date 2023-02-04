import Skill from '../models/skill.js'


export default {
    create,
    
}

async function create(req, res){
    console.log('============================================')
    console.log('============================================')
    console.log('============================================')
    console.log(req.body)
    try {
        console.log('============================================')
        console.log('============================================')
        console.log('============================================')
        console.log(req.params)
        const skill = await Skill.subSkill.create({


        });
       
        // skill.subSkills.push({username: req.user.username, userId: req.user._id}); //mutating a document
        // await post.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

