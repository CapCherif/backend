const express = require('express');
const bodyParser = require('body-parser');
let urlencodedparser = bodyParser.urlencoded({extended:false})


const app = express();
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.post('/post_msg', urlencodedparser,  (req,res)=>{

  console.log('posted')
    var mailOptions = {
      from: 'Client - Website',
      to: 'gharbi_cherif@hotmail.com',
      subject: "Client",
      text: "name: " + req.body.nom + " " + req.body.prenom + '\n' + " email :" +
      req.body.email  +'\n' + "phone : "+ req.body.phone + '\n' + "message : " + req.body.msg
    };
    

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        res.json({res:true});
        }
    });
     
    
})

var fs = require('fs');

app.post('/getnews', urlencodedparser, (req,res)=>{
    console.log(req.body)
    var category = req.body.category
    var value = req.body.input
    console.log(category, value)
    var data = JSON.parse(fs.readFileSync('./news.json', 'utf8'));
    console.log(data)
    var filter = []
    data.data.forEach((element)=> {
      if(element.title.indexOf(value) != -1){
        filter.push(element)
      }
    })
    setTimeout(() => {
      res.json({data:filter})
      
    }, 2000);
})

app.post('/getallnews', urlencodedparser, (req,res)=>{
  console.log(req.body.currentPage)
  if(req.body.currentPage == 1){
    var data = JSON.parse(fs.readFileSync('./news.json', 'utf8'));
    setTimeout(() => {
      res.json({data_object:data})
      
    }, 2000);
  }
  else if(req.body.currentPage == 2){
    var data = JSON.parse(fs.readFileSync('./page2.json', 'utf8'));
    setTimeout(() => {
      res.json({data_object:data})
      
    }, 2000);
  }
  else if(req.body.currentPage == 3){
    var data = JSON.parse(fs.readFileSync('./page3.json', 'utf8'));
    setTimeout(() => {
      res.json({data_object:data})
      
    }, 2000);
  }
    
})









const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});



























var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'elbey.constantine25@gmail.com',
    pass: 'eocvqfnrpolktrvg'
  }
});


