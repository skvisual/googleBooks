import React from "react";

// When the <Form> tag is used in Home.js, it passes the current q in the state, 
// along with the handleInputChange and handleFormSubmit methods
function Form({ q, handleInputChange, handleFormSubmit }) {
  // It then returns a form which fires off handleInput change when there's a change, passing in the event (what you typed in)
  return (
    <form>
      <div className="form-group">
        <label htmlFor="Query">
          <strong>Book</strong>
        </label>
        <input
          className="form-control"
          id="Title"
          type="text"
          value={q}
          placeholder="Ready Player One"
          name="q"
          onChange={handleInputChange}
          required
        />
      </div>
      {/* It also renders a button which fires off handleFormSubmit when clicked */}
      <div className="pull-right">
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-lg btn-danger float-right"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Form;
