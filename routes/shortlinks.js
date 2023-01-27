

const express = require ('express');
const router = express.Router();
const ShortLink = require('../models/shortlink');
const db = require('../firebase_config')
const checkAuth = require('../middleware/check-auth')
const ShortLinkCollection = db.collection("ShortLinks")

const jwt = require('jsonwebtoken')

const dotenv = require("dotenv");


dotenv.config()

const ShortLinksController = require('../controllers/shortlinks') ;



// api to stimulate login system but it actually returns only the token to test jwt authentication in next apis
// write any username and id in query params
router.post('/getToken',ShortLinksController.getToken);


// api to get all shortlinks
router.get("/",checkAuth,ShortLinksController.shortlinks_get_all);



//get one shortlink
router.get("/getOneLink",checkAuth, ShortLinksController.shortLinks_get_one);



// add a new shortlink to the db
router.post("/",checkAuth,ShortLinksController.shortLinks_add_one); 



// update link in the db
router.patch("/updateLink",checkAuth, ShortLinksController.shortLinks_update_one);



// delete a shortlink from db
router.delete("/deleteShortLink",checkAuth,ShortLinksController.shortLinks_delete_one );



module.exports = router;
