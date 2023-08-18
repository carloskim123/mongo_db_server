const express = require('express')
const { getDb, connectToDb } = require('./db')

let PORT = 4000
// init app & middleware
const app = express()

// db connection
let db

connectToDb((err) => {
  if(!err){
    app.listen(PORT, () => {
      console.log('app listening on port '+PORT)
    })
    db = getDb()
  }
})

// routes
app.get('/books', (req, res) => {
  let books = []

  db.collection('books')
    .find()
    .sort({author: 1})
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})

