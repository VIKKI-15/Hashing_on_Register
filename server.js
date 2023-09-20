const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongodb = "mongodb://127.0.0.1:27017/login";
const UserModel = require("./models/user.model");

const app = express();

app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//connection to Mongoose
mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log("Unable to connect:", error);
  });

// Route to LoginPage
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const saltRounds = 9;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new UserModel({
    name: username,
    mail: email,
    pass: hashedPassword,
  });
  //Saving the person Information
  newUser
    .save()
    .then((savedPerson) => {
      console.log("saved person:", savedPerson);
      res.sendFile(__dirname + "/public/thank.html");
    })
    .catch((error) => {
      res.sendFile(__dirname + "/public/dberror.html");
      res.console.log("Error saving person:", error);
    });
});

// Route to NoPage
app.get("/", (req, res) => {
  res.status(404);
  res.send(
    " <h1 align='center' margin='auto' >Error 404: Resource not found</h1>"
  );
});

//Server Listen
const port = 3000;
app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
