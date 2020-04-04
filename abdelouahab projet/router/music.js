const express = require('express');
const musicColtroller = require('./../controller/musicColtroller');

const router = express.Router();

router.get('', musicColtroller.getAllMusic);
router.post('', musicColtroller.storeMusic);


module.exports = router;