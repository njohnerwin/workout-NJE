const router = require("express").Router();
const db = require("../models");
const path = require("path");

router.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
})

router.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
})

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne({
    _id: req.params.id
  }, {
    $push: {
      exercises: req.body 
    }
  }).then(Workout => {
    res.send(Workout);
  }).catch(err => {
    res.json(err);
  })
});

router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then(Workout => {
      res.json(Workout);
    }).catch(err => {
      res.json(err);
    })
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .sort({ date: -1 }) 
    .then(Workout => {
      res.json(Workout);
    }).catch(err => {
      res.json(err);
    })
});

module.exports = router;
