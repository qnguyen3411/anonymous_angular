const express = require('express');
const mongoose = require('mongoose');
const bParser = require('body-parser');

const app = express();
app.use(express.static( __dirname + '/./public/dist/public' ));
app.use(bParser.json())
app.listen(8000, () => {
  console.log("LISTENING")
})

const NoteSchema = new mongoose.Schema({
  content: {type: String, minlength: [3, "Note's gotta be at least 3 characters"]}
},{timestamps: true})
mongoose.connect('mongodb://localhost/notes');
mongoose.Promise = global.Promise;

mongoose.model('Note', NoteSchema);
const Note = mongoose.model('Note');

app.get('/api/notes', (req, res) => {
  Note.find().then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})

app.post('/api/notes', (req, res) => {
  Note.create(req.body).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})


app.all("*", (req,res) => {
  res.sendFile(__dirname + "/./public/dist/public/index.html")
});
