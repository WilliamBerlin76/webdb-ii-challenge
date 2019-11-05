const express = require('express');

const router = express.Router();

const Cars = require('./dbConfig.js');

router.get('/', (req, res) => {
    Cars('specs')
        .then(specs => {
            res.status(200).json(specs)
        })
        .catch(err => {
            res.status(500).json({error: 'failed to get the cars'})
        });
});

router.get('/:id', verifyVehicleId, (req, res) => {
    Cars
        .select('*')
        .from('specs')
        .where('id', '=', req.params.id)
        .first()
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not retrieve the vehicle by id'})
        })
})

router.post('/', verifyVehicleBody, (req, res) => {
    Cars
        .insert(req.body, 'id')
        .into('specs')
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'could not add the new car'})
        });
});

router.put('/:id', verifyVehicleId, verifyVehicleBody, (req, res) => {
    const edits = req.body;
    Cars('specs')
        .where({id: req.params.id})
        .update(edits)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not update the vehicle info'})
        })   
})
router.delete('/:id', verifyVehicleId, (req, res) => {
    Cars('specs')
        .where({id: req.params.id})
        .del()
        .then(car => {
            res.status(200).json({message: `the vehicle at id ${req.params.id} was removed`})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not remove the vehicle from the database'})
        });
});

//////////////////////// MiddleWare ////////////////////////////

function verifyVehicleId(req, res, next){
    Cars
        .select('*')
        .from('specs')
        .where('id', '=', req.params.id)
        .first()
        .then(car => {
            console.log(car)
            if (!car){
                return res.status(404).json({message: `the vehicle with the id ${req.params.id} does not exist`})
            } else {
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Could not verify the id of the vehicle'})
        })
};

function verifyVehicleBody(req, res, next){
    const body = req.body;

    if (!body){
        return res.status(400).json({message: 'please include a body'})
    } else if (!body.VIN || !body.make || !body.model || !body.mileage){
        return res.status(400).json({message: 'please include all required fields: VIN, make, model, and mileage'})
    } else {
        next();
    }
}


module.exports = router;