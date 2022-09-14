const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());

const mongodbURL =
  "mongodb+srv://akbar:qwe123@cluster0.v97ttzh.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongodbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongodb connected");
  });
//CRUD

//get all data
app.get("/api/v1/tasks", async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).send({
      data: allTasks,
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal error",
      error: err,
    });
  }
});

//get by id
app.get("/api/v1/tasks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);
    res.status(200).send({
      data: task,
    });
  } catch (err) {
    res.status(404).send({
      message: "There is no data with this id",
      error: err,
    });
  }
});

//create data
app.post("/api/v1/tasks", async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      complited: req.body.complited,
    });

    res.status(201).send({
      data: newTask,
    });
  } catch (err) {
    res.status(403).send({
      message: "Invalid credentials",
      error: err,
    });
  }
});

//update data
app.put("/api/v1/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const toUpdate = await Task.findByIdAndUpdate(id, body, {
      runValidators: true,
      new: true,
    });

    res.status(200).send({
      data: toUpdate,
    });
  } catch (err) {
    res.status(404).send({
      message: "There is no data with this id",
      error: err,
    });
  }
});

//delete data
app.delete("/api/v1/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Task.findByIdAndRemove(id);
    res.status(200).send({
      message: "The data deleted",
    });
  } catch (err) {
    res.status(404).send({
      message: "There is no data with this id",
      error: err,
    });
  }
});

app.use("/", express.static(path.join(__dirname, "./build")));

const port = 5000;
app.listen(port, () => console.log("The server started on port 5000..."));
