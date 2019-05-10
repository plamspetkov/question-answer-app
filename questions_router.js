const express = require('express');
const router = express.Router();

const question = require('./question.model');
const answers = require('./answer.model');

/****** Routes *****/
router.get('/', (req, res) => {
    question.find()
        .then(questions => res.json(questions))
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    question.find({_id: id})
        .then(data => res.json(data))
});

router.delete('/delete-question/:id', (req, res) => {
    let id = req.params.id;
    question.deleteOne({"_id": id}, function(err, docs) {
        if (err) return err;
        res.send(docs);
    });
});


router.post('/add-question', (req, res) => {
    let newQuestion = new question({
        title: req.body.title,
        description: req.body.description
    });

    newQuestion
        .save()
        .then(question => res.json(question));
});

router.delete('/delete-all-questions', (req, res) => {
    question.deleteMany({}, function(err) {
    });
});

module.exports = router;
