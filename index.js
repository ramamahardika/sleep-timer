const express = require("express");
const bodyParser = require('body-parser')
const path = require("path");
const app = express();
const { exec } = require('child_process');
const port = 5000;

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'views')));
app.engine('pug', require('pug').__express)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/api", (req, res) => {
  const time = req.body.time;
  if(isNaN(time) || time === "0" ) {
    return res.status(200).send({
      message: "notnumber"
    });
  }  
  exec('shutdown -s -t ' + time, {windowsHide: true}, (err, stdout, stderr) => {
    if (err) {
      return res.status(200).send({
        message: "fail"
      })
    }
    res.status(200).send({
      message: "success"
    })
  });
});
app.post("/cancel", (req, res) => {  
  exec('shutdown -a', {windowsHide: true}, (err, stdout, stderr) => {
    if (err) {    
      return res.status(200).send({
        message: "fail"
      })
    }
    res.status(200).send({
      message: "success"
    })
  });
});
app.listen(port)