const express = require("express");
const notes = require("./db/db.json");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const note = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  for (var i = 0; i < notes.length; i++) {
    console.log(typeof notes[i].id);
    console.log(typeof req.params.id);
    if (notes[i].id == req.params.id) {
      notes.splice(i, 1);
      fs.writeFileSync("./db/db.json", JSON.stringify(notes));
      res.json(notes);
    }
    // console.log(notes[i]);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
