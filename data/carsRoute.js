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

router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;