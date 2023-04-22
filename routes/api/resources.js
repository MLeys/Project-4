import express from 'express';
const router = express.Router();
import resourcesCtrl  from '../../controllers/resources.js';

// *================= PUBLIC ROUTES ================*
// router.get('/', resourcesCtrl.index)
router.post('/', resourcesCtrl.create)

router.delete('/:id', resourcesCtrl.delete)
router.delete('/deleteAllByVideoId/:videoId', resourcesCtrl.deleteAllByVideoId)
// router.post('/:id', resourcesCtrl.assignUser)
// router.put('/:id', resourcesCtrl.unAssignUser)
router.get('/all', resourcesCtrl.all)
// router.get('/:id', resourcesCtrl.show)






export default router;