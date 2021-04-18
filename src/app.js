const express = require('express');
const app = express();
const hbs  = require('hbs');
const port = process.env.PORT || 8000;
const path = require('path');

const publicPath = path.join(__dirname,'../public') ;
// console.log(publicPath)
const templatePath = path.join(__dirname,'../templates/views');
// console.log(templatePath);
const partialsPath = path.join(__dirname,'../templates/partials')
// console.log(partialsPath);
app.set('view engine', 'hbs')
app.set('views',templatePath)
hbs.registerPartials(partialsPath)

// run static website 
app.use(express.static(publicPath))

app.get("/",(req,res)=>{
    res.render('index')
})

app.get("/about",(req,res)=>{
    res.render('about')
})

app.get("/weather",(req,res)=>{
    res.render('weather')
})
app.get("/weather/*",(req,res)=>{
    res.render('404error',{
        msgError : "Oops ! Page Not Found"
    })
})
app.get("/about/*",(req,res)=>{
    res.render('404error',{
        msgError : "Oops ! Page Not Found"
    })
})
app.get("*",(req,res)=>{
    res.render('404error',{
        msgError : "Oops ! Page Not Found"
    })
})

app.listen(port,"127.0.0.1",()=>{
    console.log(`Listening from the ${port}`);
})