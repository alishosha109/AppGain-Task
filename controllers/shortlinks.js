
const express = require ('express');
const router = express.Router();
const ShortLink = require('../models/shortlink');
const db = require('../firebase_config')
const checkAuth = require('../middleware/check-auth')
const ShortLinkCollection = db.collection("ShortLinks")

const jwt = require('jsonwebtoken')

const dotenv = require("dotenv");


dotenv.config()


function generateRandomFloatInRange() {
    return Math.floor((Math.random() * (999999999999 - 99999999999 + 1)) + 99999999999).toString(26);
  }
  

//get token request controller
exports.getToken = (req,res,next)=>{
    var username = req.query.username
    var id = req.query.id
    console.log(username)
    const token = jwt.sign({
      username:username,
      userId:id,
      },process.env.JWT_KEY,
      {
        expiresIn: "200d",
      })
    res.status(200).json({
      token:token
    });
  };


// get all shortlinks request controller
exports.shortlinks_get_all = async(req,res,next) =>{
  
    ShortLinkCollection.get()
    .then( result=>{
      const list = result.docs.map((doc)=>({id:doc.id, ...doc.data()}));
      res.status(200).json({
        count:list.length,
        shortLinks:list
      })
    }).catch(err=>{
      res.status(500).json({
        error:err
      })
    })
  };



// get one shortlink request controller
exports.shortLinks_get_one = async(req, res, next) => {
    var link_id = req.query.linkId
    ShortLinkCollection.doc(link_id).get()
    .then( result=>{
      if(result.exists){
        var data = result.data()
        res.status(200).json({
          count:data.length,
          shortLink:data
        })
      }else{
        res.status(404).json({
          message:"ID doesn't exist"
        })
      }
    
    }).catch(err=>{
      res.status(500).json({
        error:err
      })
    })
  };


// add shortlink request controller
exports.shortLinks_add_one = async(req, res, next) => {
    var slug = req.body.slug
    if (slug === undefined || slug.length == 0){
      slug = generateRandomFloatInRange();
    }
   
    const shortlink = new ShortLink(
      slug,
      req.body.ios,
      req.body.android,
      req.body.web,

    );
    var fire_col = shortlink.get_collection()
    
  ShortLinkCollection.add(fire_col).then(result=>{
          res.status(201).json({
      message: "shortlink stored",
    }) 
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });  
};


// update link request controller
exports.shortLinks_update_one = async(req, res, next) => {
    var link_id = req.query.linkId
    delete req.body.slug
    var snapshot = await ShortLinkCollection.doc(link_id).get()
    console.log(snapshot.exists)
    if(snapshot.exists){
      ShortLinkCollection.doc(link_id).update(req.body)
      .then( result=>{
        res.status(201).json({
          message:"Updated Succesfully"
        })
    
        
      }).catch(err=>{
        res.status(500).json({
          error:err
        })
      })
    }else{
      res.status(404).json({
        message:"ID doesn't exist"
      })
    }
   
  };


//delete link request controller
exports.shortLinks_delete_one = async(req, res, next) => {
    var link_id = req.query.linkId
    console.log(link_id)
    var snapshot = await ShortLinkCollection.doc(link_id).get()
    if(snapshot.exists){
      ShortLinkCollection.doc(link_id).delete()
      .then( result=>{
        
        res.status(201).json({
          message:"Deleted Succesfully"
        })
      }).catch(err=>{
        res.status(500).json({ 
          error:err
        })
      })
    }else{
      res.status(404).json({
        message:"ID doesn't exist"
      })
    }
  
  };

