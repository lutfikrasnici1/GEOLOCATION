var express = require('express');
var router = express.Router();
controller = require('../controller/controller');
var axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
    .then(function(userdata){
        res.render("update",{user : userdata.data});
    })
    .catch(err =>{
        res.send(err);
    })});

router.put('/api/users/:id', controller.update);

module.exports = router;
