const express = require ('express');
const router = express.Router();
const ShortLink = require('../models/shortlink');
const db = require('../firebase_config')
const checkAuth = require('../middleware/check-auth')
const ShortLinkCollection = db.collection("ShortLinks")

const jwt = require('jsonwebtoken')

const dotenv = require("dotenv");


dotenv.config()

const WebHookController = require('../controllers/webhook') ;


router.get("/",WebHookController.testWebHook);

router.post("/",WebHookController.testPostWebHook);


module.exports = router;
