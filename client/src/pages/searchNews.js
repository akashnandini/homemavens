import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import SearchResultContainer from "../components/SearchResultContainer";
import axios from "axios";
class searchNews extends Component {
  state = {
    country: "",
    category: ""    
  };
  handleInputChange = event => {
    const { country, value } = event.target;
    this.setState({
      [country]: value
    });
  };

  

handleFormSubmit = event => {
  event.preventDefault();
  const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('812ef34128434c998897df67e51cd878');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
/*newsapi.v2.topHeadlines({
  sources: 'bbc-news,the-verge',
  q: 'bitcoin',
  category: 'business',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  
});
// To query /v2/everything
// You must include at least one q, source, or domain
/*newsapi.v2.everything({
  q: 'bitcoin',
  sources: 'bbc-news,the-verge',
  domains: 'bbc.co.uk, techcrunch.com',
  from: '2017-12-01',
  to: '2017-12-12',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
 
});
// To query sources
// All options are optional
newsapi.v2.sources({
  category: 'technology',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      sources: [...]
    }
  
});*/
var url = "https://newsapi.org/v2/top-headlines?country="+this.state.country+"&apiKey='812ef34128434c998897df67e51cd878'";
console.log("Url=="+url);
axios.get(url).then(response => {
  console.log(response);
})
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <button onClick={this.handleFormSubmit} style={{ textAlign: "center"}}>Search News</button>
              
            </Jumbotron>           
          </Col>          
        </Row>
      </Container>
    );
  }
}

export default searchNews;
