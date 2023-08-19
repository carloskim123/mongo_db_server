const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb, connectToDb } = require("./db");
const cors = require("cors");

let PORT = 4234;
// init app & middleware
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// db connection
let db;

connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

// routes
app.get("/books", (req, res) => {


  let books = [];

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});
//////////////////////////////////////////////////////////////////

// create

app.post("/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then(() => {
      res.status(201).json(book);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create the document" });
    });
});

// read

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(id) })
      .then((document) => {
        res.status(200).json(document);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "Invalid id" });
  }
});

// delete
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    db.collection("books")
      .deleteOne({ _id: new ObjectId(id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the document" });
      });
  } else {
    res.status(500).json({ error: "Invalid id" });
  }
});


// update
app.patch("/books/:id", (req, res) => {
  const updates = req.body;
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    db.collection("books")
      .updateOne({ _id: new ObjectId(id) }, {$set: updates})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not update the document" });
      });
  } else {
    res.status(500).json({ error: "Invalid id" });
  }
});


// start server
app.listen(PORT, () => {
  console.log("app listening on port " + PORT);
});
