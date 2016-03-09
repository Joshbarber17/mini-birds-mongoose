var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var port = 2020
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.listen(port, function(){
  console.log("listening on port " + port)
})
mongoose.connect('mongodb://localhost/even-more-fun'); //how to connect to my database via mongoose
mongoose.connection.once('open', function(){ //once the connectino is open, call this callback function
  console.log("connected to MongoDB")
});

var Sighting = require('./sightings');
var User = require('./user')

app.post('/api/users', function(req, res, next){
  var user = new User(req.body);
  user.save(function(err, response){
    if (err) {
      return res.status(500).send(err)
    }
    else {
      res.send(response)
    }
  })
})

app.get('/api/sighting', function(req, res, next){
  if (req.query.species) {
    Sighting.find(req.query, function(err, response){
      res.status(200).send(response)
    })
  }
  else if (req.query.order) {
    Sighting.find(req.query).populate("user").exec(function(err, response){
      if (response.length < 1) {
        res.status(500).send("order does not exist")
      }
      else {
      res.status(200).send(response);
      }
    })
  }
  else {
    Sighting.find().populate('user').exec(function(err, response){
      res.status(200).send(response)
    })
  }
})


app.post('/api/sighting', function(req, res, next){
  var sighting = new Sighting(req.body)
  sighting.save(function (err, s){
    return err ? res.status(500).send(err): res.status(200).send(s)
  })
})
app.put('/api/sighting', function(req, res, next){
  Sighting.update(req.query, req.body, function(err, response){ //don't need the $set with mongoose. it does it "under the hood" but you can replace with whatever without erasing
    res.status(200).send(response)
  })
})
app.delete('/api/sighting', function(req, res, next){
  Sighting.remove(req.query, function(err, response){
    res.status(200).send(response)
  })
})
