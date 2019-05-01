import React, { Component } from "react";

import Jumbotron from "../components/Jumbotron";

import { Col, Row, Container } from "../components/Grid";


class Homes extends Component {
  state = {
   
  };

  
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <img src="../../logo.png"></img>
            </Jumbotron>           
          </Col>          
        </Row>
      </Container>
    );
  }
}

export default Homes;
