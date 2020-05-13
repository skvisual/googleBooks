// create mongoose schema "bookSchema", with the following key value pairs

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  authors: { type: [String], required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  googleId: { type: String, required: true, unique: true }
});

// create constant "Book" to allow for export (I think this can be combined in to one line of code, but not sure how)
const Book = mongoose.model("Book", bookSchema);

// export "Book" for use elsewhere
module.exports = Book;
