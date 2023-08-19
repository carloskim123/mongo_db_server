const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb, connectToDb } = require("./db");
const cors = require("cors");


let PORT = 4234;
// init app & middleware
const app = express();

// middleware
app.use(cors({
  origin: "*",
}));
app.use(express.json());
app.use(express.urlencoded());

// db connection
let db:DatabaseConnection;

connectToDb((err: Error) => {
  if (!err) {
    db = getDb();
  }
});

// routes
app.get("/books", (req: Request, res) => {
  let books: Book[] = [];

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book: Book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/books/:id", (req, res) => {
  const id: string = req.params.id;

  if (ObjectId.isValid(id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(id) })
      .then((document: Book) => {
        res.status(200).json(document);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "Invalid id" });
  }
});

app.post("/books", (req, res) => {
  const book: Book = req.body;

  db.collection("books")
    .insertOne(book)
    .then(() => {
      res.status(201).json(book);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not create the document" });
    });
});

app.listen(PORT, () => {
  console.log("app listening on port " + PORT);
});
