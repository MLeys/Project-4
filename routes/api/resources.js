import express from 'express';
const router = express.Router();
import resourcesCtrl  from '../../controllers/resources.js';

// *================= PUBLIC ROUTES ================*
// router.get('/', resourcesCtrl.index)

router.delete('/deleteAllByVideoId/:videoId', resourcesCtrl.deleteAllByVideoId)
router.delete('/:id', resourcesCtrl.delete)

router.put('/:id', resourcesCtrl.unAssignUser)
router.post('/:id', resourcesCtrl.assignUser)
router.post('/', resourcesCtrl.create)

router.get('/all', resourcesCtrl.all)
// router.get('/:id', resourcesCtrl.show)






export default router;