const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Dream} = require('./models');

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/dreams.html');
});

router.get('/demo', (req, res) => {
  Dream
    .find()
    .sort({created: -1})
    .exec()
    .then(dreams => {
      res.json(dreams.map(dream => dream.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

router.get('/new', (req, res) => {
  res.sendFile(__dirname + '/public/new-dream.html');
});

router.get('/:id', (req, res) => {
  res.sendFile(__dirname + '/public/dream-edit.html');
  // Dream
  //   .findById(req.params.id)
  //   .exec()
  //   .then(dream => res.json(dream.apiRepr()))
  //   .catch(err => {
  //     console.error(err);
  //     res.status(500).json({error: 'something went horribly awry'});
  //   });
});

router.get('/:id/json', (req, res) => {
  Dream
    .findById(req.params.id)
    .exec()
    .then(dream => res.json(dream.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});

router.post('/new', (req, res) => {
  const requiredFields = ['title', 'entry', 'type', 'hoursSlept', 'created'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      res.status(400).json(
        {error: `Missing "${field}" in request body`});
    }});

  Dream
    .create({
      title: req.body.title,
      entry: req.body.entry,
      type: req.body.type,
      hoursSlept: req.body.hoursSlept,
      created: {
        month: req.body.created.month,
        day: req.body.created.day,
        year: req.body.created.year
      },
      user_id: req.user.id
    })
    .then(dreamEntry => res.status(201).json(dreamEntry.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

router.put('/:id/json', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['title', 'entry', 'type', 'hoursSlept', 'created'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Dream
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedDream => res.status(204).json(updatedDream.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

router.delete('/:id/json', (req, res) => {
  Dream
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

module.exports = router;
