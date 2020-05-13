// create the constant DB, requiring models
const db = require("../models");

// Defining methods for the bookController
module.exports = {
  // findAll method passing in request and response cRud
  findAll: function(req, res) {
    // utilize db (created on line 2) to look in the Book array and find based off the request query
    db.Book.find(req.query)
    // upon success, return dbBook as a json response
      .then(dbBook => res.json(dbBook))
      // if error throw error
      .catch(err => res.status(422).json(err));
  },
  // findById method passing in request and response cRud
  findById: function(req, res) {
    // utilize db to look in the Book array for a specific id
    db.Book.findById(req.params.id)
    // return the dbBook as a json response
      .then(dbBook => res.json(dbBook))
      // if error throw error
      .catch(err => res.status(422).json(err));
  },
  // create method  passing in request and response Crud
  create: function(req, res) {
    // utilize db to create based off req.body
    db.Book.create(req.body)
    // return the dbBook as a json response
      .then(dbBook => res.json(dbBook))
      // if error throw error
      .catch(err => res.status(422).json(err));
  },
  // update method passing in request and response crUd
  update: function(req, res) {
    // utilize db to findOneAndUpdate based off req.params.id
    db.Book.findOneAndUpdate({ id: req.params.id }, req.body)
    // return dbBook as a json response
      .then(dbBook => res.json(dbBook))
      // if error throw error
      .catch(err => res.status(422).json(err));
  },
  // remove method passing in request and response cruD
  remove: function(req, res) {
    // utilize db to findById based of req.params.id
    db.Book.findById(req.params.id)
    // then remove dbBook
      .then(dbBook => dbBook.remove())
      // then return dbBook as a json object
      .then(dbBook => res.json(dbBook))
      // if error throw error
      .catch(err => res.status(422).json(err));
  }
};
