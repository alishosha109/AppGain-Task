const express = require ('express');
const router = express.Router();
const ShortLink = require('../models/shortlink');
const db = require('../firebase_config')
const checkAuth = require('../middleware/check-auth')
const ShortLinkCollection = db.collection("ShortLinks")

const jwt = require('jsonwebtoken')

const dotenv = require("dotenv");


dotenv.config()


exports.testWebHook = async(req,res,next) =>{
    var hub_mode = req.query["hub.mode"]
    var hub_challenge = req.query["hub.challenge"]
    var hub_token = req.query["hub.verify_token"]

    res.send(hub_challenge);
  };


exports.testPostWebHook = async(req,res,next) =>{
    

    res.send(req.body);
  };
