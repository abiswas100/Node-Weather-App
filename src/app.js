const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname)
// console.log(path.join(__dirname,'../public')); we did it to connect the public and src 

const app = express()

//Defining Paths for Express Config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup HandleBars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory 
app.use(express.static(publicDirectory))

// App Routes
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Avhishek'
    })   // It renders the hbs file 
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About ME',
        name:'Avhishek'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Avhishek'
    })
})
// weather router
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'Please give an address'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{          //{lati,long,loca} -> is destructured from data
            if(error){
                return res.send({
                    error
                })
            }
            // console.log('error',error);
            // console.log('data',data);
    
            forecast(latitude ,longitude, (error,forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                else{
                    return res.send({
                        location,
                        Forecast:forecastData,
                        address:req.query.address
                    })
                }
          })
        })
    }    
})


// app.get('/products', (req, res) => {
//     if(!req.query.search){                                  //query string is parsed by req.query 
//         res.send({
//             error:'You must provide a search term'
//         })
//     }else{
//         console.log(req.query.search)
//             res.send({
//                 products: []
//         })
//     }
// })

//404 handler
app.get('/help/*',(req,res)=>{             
    res.render('error',{
        title:'Error',
        name:'Avhishek',
        message:'Help article not found'
    })
})

app.get('*',(req,res)=>{              //wildcard (*) -  this character means anything other than the routes
    res.render('error',{
        title:'Error',
        name:'Avhishek',
        message:'Page not Found'
    })
})


// Setting up the server
app.listen(3000,()=>{
    console.log('server is Up on port 3000')
})  // common development port 

