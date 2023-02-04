import Skill from '../models/skill.js'


export default {
    create,
    deleteSkill
}

async function create(req, res){
    console.log('============================================')
    console.log('============================================')
    console.log('============================================')
    console.log(req.params.id)
    try {
        const skill = await Skill.subSkill.create({

        });
       
        // skill.subSkills.push({username: req.user.username, userId: req.user._id}); //mutating a document
        // await post.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteSkill(req, res){
    try {
        
        const post = await Post.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        post.likes.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await post.save() // after you mutate a document you must save
        // res is an object that can respond to the client
        
        res.json({data: 'like removed'})
    } catch(err){
        res.status(400).json({err})
    }
}