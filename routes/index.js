var express = require('express');
var router = express.Router();
var controller = require('../controller/controller')
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send("NOT GOOD");
        })
});


// API FUNCTIONS
router.get('/api/users', controller.find);
router.post('/api/users',controller.create);
router.delete('/api/users/:id', controller.delete);
router.put('/api/users/:id', controller.update);



module.exports = router;
