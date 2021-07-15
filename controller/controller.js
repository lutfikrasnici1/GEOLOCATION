var UserDb = require('../model/model');



exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const user = new UserDb({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        AddressLine: req.body.AddressLine1,
        City: req.body.City,
        Country: req.body.Country,
        "Location": {
            "type": "Point",
            "coordinates": [parseFloat(req.body.Latitude), parseFloat(req.body.Longtitude)]
        }

    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}


exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        UserDb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id })
            })

    }
    if (req.query.Latitude && req.query.Longtitude) {
        const Latitude = req.query.Latitude;
        const Longtitude = req.query.Longtitude;
        UserDb.find({
            Location :{
                $near:{
                    $geometry:{
                        type : "Point",
                        coordinates : [Latitude,Longtitude]
                    },
                    $maxDistance :100,
                    $minDistance :0
                }
            }
        }).then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + Latitude + " " + Longtitude })
            } else {
                res.send(data);
            }


        }).catch(err => {
            res.status(500).send({ message: "Error retrieving user with id " + id })
        })
    }
    else {
        UserDb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }


}



exports.delete = (req, res) => {
    const id = req.params.id;

    UserDb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    UserDb.findOneAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}