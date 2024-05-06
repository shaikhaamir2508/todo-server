const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const user = require("./models");
require("./DB");
const Task = require("./models/Task");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  try {
    let preuser = await user.findOne({ email });
    if (preuser) {
      res.status(404).send("user already exists");
    } else {
      let adduser = await user({ name, email, password, cpassword });
      adduser.save();
      res.json(adduser);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const checkUser = await user.findOne({ email });
    if (checkUser != null || checkUser != undefined) {
      if (checkUser.password == password) {
        res.send({
          status: 200,
          msg: "Login Successfully",
          data: checkUser._id,
        });
      } else {
        res.send({ status: 201, msg: "Password is incorrect" });
      }
    } else {
      res.send({ status: 201, msg: "Email does not exists" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await user.findOne({ _id: id }, { name: 1, email: 1 });
    res.send(userData);
  } catch (error) {
    console.log(error);
  }
});

app.post("/addTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, date } = req.body;
    const saveTask = await Task({
      task,
      date,
      userId: id,
      status: false,
    }).save();
    res.send({ status: 200, msg: "Task added successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getUsersTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.find({ userId: id });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/changeTaskStatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = await Task.findByIdAndUpdate(
      { _id: id },
      { status: true }
    );
    res.send({ status: 200, msg: "Status updated" });
  } catch (error) {
    cconsole.log(error);
  }
});

app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findOneAndDelete({ _id: id });
    res.send({ status: 200, msg: "Task Deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    res.send(task);
  } catch (error) {
    console.log(error);
  }
});

app.post("/updateTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, date } = req.body;
    const status = req.body.status == "Done" ? "true" : "false";
    if (status == undefined || !status) {
      const findTask = await Task.findById({ _id: id });
      const updateTask = await Task.findByIdAndUpdate(
        { _id: id },
        { task, date, status: findTask.status }
      );
      res.send({ status: 200, msg: "Task updated" });
    } else {
      const updateTask = await Task.findByIdAndUpdate(
        { _id: id },
        { task, date, status }
      );
      res.send({ status: 200, msg: "Task updated" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("server created");
});
