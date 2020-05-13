// Import react, needed components, and API
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

// Class component for the saved books page
class Saved extends Component {
  // Initial state with books as an empty array
  state = {
    books: []
  };

  // When this component loads, run the getSavedBooks method to populate the books in state
  componentDidMount() {
    this.getSavedBooks();
  }

  // Method that hits the API to get the saved books from the database
  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res =>
        // Set the state to be an array of the saved books
        this.setState({
          books: res.data
        })
      )
      .catch(err => console.log(err));
  };

  // Method that hits the API to delete a book given the ID of that book
  handleBookDelete = id => {
    // Delete the book with the id and run getSavedBooks to update the state
    API.deleteBook(id).then(res => this.getSavedBooks());
  };

  // This renders everything to the main page, specifically using the List component
  // to render an unorganized list of Books with their info
  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Books" icon="download">
              {/* If there are any saved books... */}
              {this.state.books.length ? (
                <List>
                  {/* Map over the books and create a book element for each one */}
                  {this.state.books.map(book => (
                    <Book
                      key={book._id}
                      title={book.title}
                      subtitle={book.subtitle}
                      link={book.link}
                      authors={book.authors.join(", ")}
                      description={book.description}
                      image={book.image}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookDelete(book._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
                // If there are no books, render "no saved books"
              ) : (
                <h2 className="text-center">No Saved Books</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
