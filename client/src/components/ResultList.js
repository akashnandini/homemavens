import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";

import Map from '../components/Map.js'

class ResultList extends Component {
 
  render() {
 
  return (
  
         
      <Jumbotron>
        <legend>Address Listing</legend>
        <br></br>
        <button type="button" className="btn btn-primary mt-3 btnNew" data-id={this.props.year_built} onClick={this.displayMap}>Save</button>
        <img src={this.props.Url} alt="MapUrl"/>
        <ul>
        
        <li>
          Address:
          <span>{this.props.add}</span>
        </li>
        <li>
        County:
        <span>{this.props.county}</span>
        </li>
        <li>
        building_type:
        <span>{this.props.building_type}</span>
        </li>
        <li>
        Levels:
        <span>{this.props.levels}</span>
        </li>
        <li>
        Finished Size:
        <span>{this.props.finished_size}</span>
        </li>
        <li>
        year_built:
        <span>{this.props.year_built}</span>
        </li>
        </ul>
        <br></br>
        
        <Map/>
        
        </Jumbotron>        
      
  );
}
}
export default ResultList;
