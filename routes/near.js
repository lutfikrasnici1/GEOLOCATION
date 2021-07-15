var express = require('express');
var router = express.Router();
var axios = require('axios');


/* GET users listing. */
router.get('/', function(req, res, next) {
    axios.get('http://localhost:3000/api/users', { params : { Latitude : req.query.Latitude ,Longtitude : req.query.Longtitude}})
    .then(function(userdata){
        res.render("near",{users : userdata.data});
    })
    .catch(err =>{
        res.send(err);
    })});


module.exports = router;

