const express = require("express");
const router = express.Router();
require('./user')(router);
require('./api/posts')(router);
module.exports = router;

