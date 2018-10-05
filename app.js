var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var Vehicle = require('./models/vehicle')
var app = express()

//Configure app for bodyParser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//connetion to db
mongoose.connect("mongodb://localhost:27017/codealong")


//Api routes
var router = express.Router()

//Router will all be prefixed api
app.use('/api',router)

//Middlewar

router.use(function(req,res,next){
    console.log('FYI... There is some processing current doeb')
    next();
})



//Text Route
router.get('/',function(req,res){
    res.json({message: 'Welcome to our api'})
})

router.route('/vehicles')
.post(function(req,res){
    var vehicle = new Vehicle();
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function(err){
        if(err){
            res.send(err)
        }
        res.json({message:'Vehicle was successfully add'})
    })
})
.get(function(req,res){
    Vehicle.find(function(err,vehicles){
        if(err){
            res.send(err)
        }
        res.json(vehicles)
    })
})

router.route('/vehicle/:vehicle_id')
.get(function(req,res){
    Vehicle.findById(req.params.vehicle_id,function(err,vehicle){
        if(err){
            res.send(err)
        }
        res.json(vehicle)
    })
})

router.route('/vehicle/make/:make')
.get(function(req,res){
  Vehicle.find({make:req.params.make},function(err, vehicle){
      if(err){
          res.send(err)
      }
      res.json(vehicle)
  })
})

router.route('/vehicle/color/:color')
.get(function(req,res){
    Vehicle.find({color:req.params.color},function(err,vehicle){
        if(err){
            res.send(err)
        }
        res.json(vehicle)
    })
})

var port = 3000

app.listen(port);

console.log('Server is start port ' + port)

