import React,{ Component } from "react";
import Jumbotron from "./Jumbotron";
import { Input, TextArea, FormBtn } from "./Form";
import axios from "axios";
import FirstPage from "../pages/FirstPage";
import NoMatch from "../pages/NoMatch";
import Result from "../pages/Result";
import { Link } from "react-router-dom";

class ZipResult extends Component {
  
  state = {
    results:[]
  
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
     // flag:true
    });
  };
  

  displayResults = () => { 
    var url= "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?postalcode=08817&page=1&pagesize=100"
    //var url = "https://api.estated.com/property/v3?token=EeGfiyigKeWeKFbdaSzo14IJL6le26&address="+this.state.address+"&city="+this.state.city+"&state=NJ";
    console.log("Url=="+url);
    axios.get( url,{
      headers: {
        "apikey": "833ffeb2822b8ee5778f7b5073319970"
      }
    }).then(res => this.setState({ results: res.data.properties}))

    .catch(err => console.log(err));

        console.log("response:  "+ this.state.results);
    }
      /*
      console.log("Address:  "+response.data.properties[0].addresses[0].formatted_street_address);
      console.log("Address:  "+response.data.properties[0].addresses[0].city);
      console.log("Address:  "+response.data.properties[0].addresses[0].state);
      console.log("Address:  "+response.data.properties[0].addresses[0].zip_code);
      console.log("County:  "+response.data.properties[0].geographies.county.name);

      this.setState({
        address:response.data.properties[0].addresses[0].formatted_street_address + " " + response.data.properties[0].addresses[0].city+" " + response.data.properties[0].addresses[0].state + " " + response.data.properties[0].addresses[0].zip_code,
        county:response.data.properties[0].geographies.county.name,
        //flood:response.data.properties[0].flood.annual_flood_risk,
        school:response.data.properties[0].geographies.school_elementary.name,
        price:response.data.properties[0].sales[0].price,
        building_type:response.data.properties[0].structures[0].building_type,
        finished_size:response.data.properties[0].structures[0].finished_size,
        year_built:response.data.properties[0].structures[0].year_built
      });*/
      
     
  
render() {
  
    return (
      <Jumbotron>
       
      <legend>Search Property By ZIP_CODE</legend>
      <Result 
        displayResults={this.displayResults}
        result={this.state.results}
        add={this.state.results.address}

    />    
       
     
      
    </Jumbotron>
  );
    

       }
}
export default ZipResult;
