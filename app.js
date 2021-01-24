const express = require('express');
// const fs =require('fs');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true})
const port = 8000;

// Define mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

  const Contact = mongoose.model('contact', ContactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// For serving static files
app.use(express.urlencoded({ extended: true}));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');// Set the template engine as pug
app.set('views', path.join(__dirname, 'views'));// Set the views directory



// END POINTS
app.get('/',(req, res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
 })

app.get('/contact',(req, res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
 })
 app.post("/contact",(req,res)=>{
    const params = {}
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
    // names = req.body.name
    // phone = req.body.phone
    // email = req.body.email
    // address = req.body.address
    // more = req.body.desc

    // let outputToWrite = `the name of the client is ${names}, ${phone}is your PN, ${email}, residing at ${address}, More about him/her ${more}`
    // fs.writeFileSync('output.txt', outputToWrite )
    // const params = {'message':'Your form has been submitted sucessfully'}
    // res.status(200).render('home.pug',params);

})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started sucessfully on port ${port}`);
}) 