'use strict';

const express = require('express');
const checkJwt = require('../middleware/checkJwt');
const router = express.Router();

// protects evry route defined below
router.use(checkJwt);

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Access token accepted.',
    userId: req.auth.payload.sub
  });
});

module.exports = router;