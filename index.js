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
mongoose.connect('mongodb://localhost/more-fun'); //how to connect to my database via mongoose
mongoose.connection.once('open', function(){ //once the connectino is open, call this callback function
  console.log("connected to MongoDB")
});

var Sighting = require('./sightings');

app.get('/api/sighting', function(req, res, next){
  if (req.query.species) {
    Sighting.find(req.query, function(err, response){
      res.status(200).send(response)
    })
  }
  else if (req.query.order) {
    Sighting.find(req.query, function(err, response){
      if (response.length < 1) {
        res.status(500).send("order does not exist")
      }
      else {
      res.status(200).send(response);
      }
    })
  }
  else {
    Sighting.find(function(err, response){
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
