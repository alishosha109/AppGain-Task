const express = require('express');
const http = require('http');
const ShortLinksRoutes = require('./routes/shortlinks')
const cors = require('cors')

const port = process.env.port || 4000;
const bodyParser = require('body-parser');
const app = express();





app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Headers',"*");
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Headers','PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

//initialize routes
app.use('/api/shortlinks',ShortLinksRoutes);



app.use((req,res,next)=>{
    res.status(200).json({
      message:"Welcome to Appgain API but it is not here"
    })
  });


  app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
      error:{
        message:error.message
      }
    });
  });


app.get('/', (req, res) => {
    res.send("Updated");
});

const server = http.createServer(app);
server.listen(port);
