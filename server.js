const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const { Workout } = require("./models");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


// API routes

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, {$push: {exercise: req.body}}, {new: true})
.then(data => res.json(data))
.catch(err => {
  console.log("error", err);
  res.json(err);
})
});


app.post("/api/workouts", ({ body }, res) => {
    Workout.create({})
     .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
       res.status(400).json(err);
      });
  });



// HTML routes

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, './public/stats.html'));
})

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, './public/exercise.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
