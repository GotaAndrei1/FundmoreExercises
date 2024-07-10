// const fs = require('fs');
// fs.readFile('input.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//   } else {
//     console.log(data);
//   }
// });

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Middleware for logging request details
app.use((req, res, next) => {
      const now = new Date();
      console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
      next();
});

let books = [];

// Create a new book
app.post("/books", (req, res) => {
      const { title, author, year } = req.body;
      const newBook = { id: books.length + 1, title, author, year };
      books.push(newBook);
      res.status(201).json(newBook);
});

// Read all books
app.get("/books", (req, res) => {
      res.json(books);
});

// Read a single book by ID
app.get("/books/:id", (req, res) => {
      const book = books.find((b) => b.id === parseInt(req.params.id));
      if (!book) {
            return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
});

// Update a book by ID
app.put("/books/:id", (req, res) => {
      const book = books.find((b) => b.id === parseInt(req.params.id));
      if (!book) {
            return res.status(404).json({ error: "Book not found" });
      }
      const { title, author, year } = req.body;
      book.title = title;
      book.author = author;
      book.year = year;
      res.json(book);
});

// Delete a book by ID
app.delete("/books/:id", (req, res) => {
      const bookIndex = books.findIndex(
            (b) => b.id === parseInt(req.params.id)
      );
      if (bookIndex === -1) {
            return res.status(404).json({ error: "Book not found" });
      }
      books.splice(bookIndex, 1);
      res.status(204).send();
});

// Middleware for error handling
app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
});
