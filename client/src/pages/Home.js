// Import react, needed components, and api
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

// class component for Home
// Sets the initial state to an empty array for books, an empty string for q (query), and the message "Search for a Book to Begin!"
class Home extends Component {
  state = {
    books: [],
    q: "",
    message: "Search For A Book To Begin!"
  };

  // This method will alter the key value pairs in the state, based on the event.target,
  // specifically what you enter into the form. If you look at the form component file, you see that name = 'q', so this changes this.state.q
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  // This method will return books based of "q" the query and respond with the key:value of books: api response
  getBooks = () => {
    API.getBooks(this.state.q)
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      // if no books are found, set "books" back to an empty array return this message
      .catch(() =>
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  };

  // When the form is submitted (search button clicked), run the get books method
  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  // This is fired off when save button is clicked
  handleBookSave = id => {
    // declare a constant called "book" set equal to this book by id
    const book = this.state.books.find(book => book.id === id);
    // utilizing API (in utils), post the book with the following key value pairs
    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
      // after posting the update, pull all books to update list
    }).then(() => this.getBooks());
  };
  // this is the data rendered to the client
  render() {
    return (
      // Grid Components (container, row, col) and rendered to the viewport
      <Container>
        <Row>
          <Col size="md-12">
            {/* Jumbotron component is rendered */}
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            {/* Card component is rendered */}
            <Card title="Book Search" icon="far fa-book">
              {/* Form component is passed two methods and q from state as props */}
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {/* If there are any books, render the list */}
              {this.state.books.length ? (
                <List>
                  {/* Map over the state array from books and create a book component for each one */}
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
                // else, if there are no books, render a h2 with the current state message, which should be "No New Books Found, Try a Different Query" 
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        {/* Footer component rendered */}
        <Footer />
      </Container>
    );
  }
}
// export "Home" function for use elsewhere
export default Home;
