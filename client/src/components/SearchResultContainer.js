import React, { Component } from "react";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    search: "",
    results: [],
  };

  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchBook("");
  }

  searchBook = query => {
    API.search(query)

      .then(res => this.setState({ results: res.data.items, flag: true }))

      .catch(err => console.log(err));


  };
  saveBook = event => {

    const thisBook = this.state.results.find(book => book.id === event.target.id);
    console.log(this.state.results);
    console.log(thisBook);

    const dbBook = {
      title: thisBook.volumeInfo.title,
      authors: thisBook.volumeInfo.authors,
      synopsis: thisBook.volumeInfo.description,
      image: thisBook.volumeInfo.imageLinks ? thisBook.volumeInfo.imageLinks.smallThumbnail : null,
      link: thisBook.volumeInfo.canonicalVolumeLink

    };


    API.saveBook(dbBook)
      .then(res => {
        console.log(res.status, res.statusText);

      })
      .catch(err => {
        console.log(err);

      })

  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBook(this.state.search);

  };

  render() {
    return (
      <div>
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />

        <ResultList results={this.state.results}
          saveAction={this.saveBook} />
      </div>
    );
  }
}

export default SearchResultContainer;
