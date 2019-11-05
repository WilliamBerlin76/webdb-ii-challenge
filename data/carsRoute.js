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

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

module.exports = router;