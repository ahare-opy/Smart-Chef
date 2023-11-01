const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/me').get(authController.viewMe);
router.route('/inventory').patch(authController.updateInventory);
router.route('/subtract-inventory').patch(authController.subtractInventory);
router.route('/reset-inventory').patch(authController.resetInventory);

module.exports = router;
