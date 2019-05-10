const express = require('express');
const router = express.Router();

const answers = require('./answer.model');

/****** Routes *****/
router.get('/', (req, res) => {
    answers.find()
        .then(answers => res.json(answers))
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    answers.find({parentId: id})
        .sort({ rating : -1})
        .then(data => res.json(data))

});

router.post('/like-answer/:id', (req, res) => {
    answers.findByIdAndUpdate(req.body.answerId, {$inc: {rating:1}},function(err,res){
        if(err) {
            res.send(err);
        }
    })
});

router.post('/dislike-answer/:id', (req, res) => {
    answers.findByIdAndUpdate(req.body.answerId, {$inc: {rating:-1}},function(err,res){
        if(err) {
            res.send(err);
        }
    })
});


router.post('/add-answer/:id', (req, res) => {
    let newAnswer = new answers({
        _id: req.body._id,
        parentId: req.body.parentId,
        text: req.body.text,
        rating: req.body.rating
    });

    newAnswer
        .save()
        .then(answer => res.json(answer));
});

// router.put('/randomize-likes', (req, res) => {
//     answers.find({} , (err, answers) => {
//         if(err) {
//             res.send(err);
//         } else {
//             answers.map(user => {
//                 user.rating = Math.floor(Math.random() * Math.floor(20));
//                 user.save(function(err) {
//                     if (err)
//                         res.send(err);
//                 });
//             })
//         }
//     })
// });

router.delete('/delete-all-answers', (req, res) => {
    answers.deleteMany({}, function(err) {
    });
});

module.exports = router;

