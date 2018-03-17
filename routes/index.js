const express = require('express');

const indexCtrl = require('../controllers/index');

const router = express.Router();

/* GET home page. */
router.get('/', indexCtrl.dashboard);

/* GET unique image. */
router.get('/:id', indexCtrl.count);

module.exports = router;
