const express = require('express');
const repairController= require('./../controllers/repairs.controller');

const router = express.Router();

router
    .route('/')
    .get(repairController.findAllRepair)
    .post(repairController.create)

router
    .route(':/id')
    .get(repairController.findRepair)
    .patch(repairController.update)
    .delete(repairController.delete)

module.exports = router;