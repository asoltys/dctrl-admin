import express from 'express'

import preAuth from './preAuth'
import membersSpec from './membersSpec'
import tasksSpec from './tasksSpec'
import dctrlSpec from './dctrlSpec'
import resourcesSpec from './resourcesSpec'
import invoicesSpec from './invoicesSpec'

const router = express.Router()

router.use('/events', preAuth)
router.use('/events', membersSpec)
router.use('/events', dctrlSpec)
router.use('/events', tasksSpec)
router.use('/events', resourcesSpec)
router.use('/events', resourcesSpec)

module.exports = router
