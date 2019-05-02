import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import result from "./result.css";
import axios from "axios";

class Result extends Component {
  state = {
    zipFlag: false,
    address: "",
    county: "",
    flood: "",
    school: "",
    price: 0,
    levels: 0,
    building_type: "",
    finished_size: 0,
    year_built: 0,
    house: [],
    mapUrl: "",
    url:"",
    price:0
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  saveHouse = event => {
    console.log("SAVE HOUSEEEEEE");  
    const dbHouse = {
      address: this.props.add ? this.props.add : this.state.address,
      county: this.props.county ? this.props.county : this.state.county,
      building_type: this.props.building_type ? this.props.building_type : this.state.building_type,
      finished_size: this.props.finished_size ? this.props.finished_size : this.state.finished_size,
      year_built: this.props.year_built ? this.props.year_built : this.state.year_built,
      email:localStorage.getItem("email"),
      school: this.props.school ? this.props.school : this.state.school,
      price: this.props.price ? this.props.price : this.state.price,

    };
    console.log(dbHouse)

    API.saveHouse(dbHouse)
      .then(res => {
        console.log("nandiniiiiii")
        console.log(res.status, res.statusText);

      })
      .catch(err => {
        console.log(err);

      })

  };
  showPrice(address1,address2,address3){
    address1=address1.trim();
    address2=address2.trim();
    address3=address3.trim();
    console.log("aaaaaaaaaaaaa:"+address1,address2,address3);
    var url = "https://api.estated.com/property/v3?token=g0u2vmspmXExqI4053XVqpEWm0V7Ct&address="+address1+"&city="+address2+"&state="+address3;
    console.log("Url=="+url);
    axios.get(url).then(response => {
      
      console.log("price:  "+response.data.properties[0].sales[0].price);
      console.log("school:  "+response.data.properties[0].geographies.school_elementary.name);

      this.setState({
        
        school:response.data.properties[0].geographies.school_elementary.name,
        price:response.data.properties[0].sales[0].price,
        
      });
     })
  }

  searchHome = (str) => {
    console.log("search home:  "+str);
    var str1 = str.split(",");

    console.log(str1)
    let str2 = str1[2].split(" ");
    console.log(str2)
    console.log(str1[0],str1[1],str2[0]);
    API.displayAddress(str1[0],str1[1],str2[1])


      .then(response => {
        console.log("response:  "+ JSON.stringify(response));
        this.setState({
          address:response.data.property[0].address.oneLine,
          county:response.data.property[0].area.countrysecsubd,
          building_type:response.data.property[0].summary.propclass,
          levels:response.data.property[0].summary.absenteeInd,
          finished_size:response.data.property[0].building.size.livingsize,
          year_built:response.data.property[0].summary.yearbuilt,
          zipFlag:true,
          url:"https://www.google.com/maps/place/"+response.data.property[0].address.oneLine,
          });
          
      })

      .catch(err => console.log(err));
       this.showPrice(str1[0],str1[1],str2[1]);
  }
  showMap = (str) => {
    console.log("search Map");
    var str1 = str.split(",");
    console.log(str1[0], str1[1]);
    API.displayMap(str1[0], str1[1])  
      .then(response => {
        console.log("response:  "+ JSON.stringify(response));
        this.setState({
          mapUrl:response.data.results[0].locations[0].mapUrl,          
        });
        console.log("MapUrllllllllllllllllll  "+this.state.mapUrl);
      })        
      .catch(err => console.log(err));

      this.render();
    }

    
  render() {

    if (!this.props.flag || this.zipFlag) {
      return (
        <Jumbotron>
          <div class="card" style={{width:"800px"}}>
              <div class="card-header" style={{ backgroundColor: "rgb(43, 43, 82)",color: "white"}}>
                    Address Listing
              </div>
              <div class="card-body" style={{ backgroundColor: "lightgrey",color: "black"}}>
                <img className="maps" src={this.props.mapUrl ? this.props.mapUrl : this.state.mapUrl} alt="MapUrl"/>
                    <ul style={{marginTop:"20px"}}>
                        <li>
                        Address:&nbsp;&nbsp;
                        <span>{this.props.add}</span>
                        </li>
                        <li>
                        County:&nbsp;&nbsp;
                        <span>{this.props.county}</span>
                        </li>
                        <li>
                        Building Type:&nbsp;&nbsp;
                        <span>{this.props.building_type }</span>
                        </li>
                        <li>
                        Price:&nbsp;&nbsp;
                        <span>{this.props.price}</span>
                        </li>
                        <li>
                        Occupied:&nbsp;&nbsp;
                        <span>{this.props.levels }</span>
                        </li>
                        <li>
                        Finished Size:&nbsp;&nbsp;
                        <span>{this.props.finished_size }</span>
                        </li>
                        <li>
                        Year Built:&nbsp;&nbsp;
                        <span>{this.props.year_built}</span>
                        </li>
                        <li>
                        Nearby Schools:&nbsp;&nbsp;
                        <span>{this.props.school}</span>
                        </li>
                    </ul>
                    <br></br>
                        <a target="_blank" href={this.props.url}>Get Directions</a>
                        {localStorage.getItem("email")?
                        (<button type="button" className="btn btn-primary mt-3 btnNew" data-id={this.props.year_built} onClick={this.saveHouse}>Save</button>)
                        :""
                        }
                </div>
              </div> 
      
        </Jumbotron>

      )
    }

    else {
      return (
        <Jumbotron>

            
            <div class="card" style={{width:"800px"}}>
                  <div class="card-header" style={{ backgroundColor: "rgb(43, 43, 82)",color: "white"}}>
                      Lisiting by ZipCode
                  </div>
                  <div className="card-body scroll" style={{ backgroundColor: "lightgrey",color: "black"}}>
                      <div className="row">
                      <div className="col-md-6">
                        <ol>
                          {this.props.zipresults.map(item => (

                          <li>

                            <Link to="#" style={{color:"black"}}
                            onClick={() => {this.searchHome(item.address.oneLine);this.showMap(item.address.oneLine)}}>{item.address.oneLine}</Link>

                          </li>

                        ))}
                      </ol>
                    </div>
                <div className="col-md-6">
                 
                    <br></br>
                    {this.state.address?
                    (<div><img className="maps" style={{marginLeft:"25px"}} src={this.props.mapUrl ? this.props.mapUrl : this.state.mapUrl} alt="MapUrl"/>
                    <ul>
                      <li>
                        Address:&nbsp;&nbsp;
                        <span>{this.state.address}</span>
                      </li>
                      <li>
                        County:&nbsp;&nbsp;
                        <span>{this.state.county}</span>
                      </li>
                      <li>
                        Building Type:&nbsp;&nbsp;
                        <span>{this.state.building_type}</span>
                      </li>
                      <li>
                        Price:&nbsp;&nbsp;
                        <span>{this.state.price}</span>
                      </li>
                      <li>
                      Occupied:&nbsp;&nbsp;
                        <span>{this.state.levels}</span>
                      </li>
                      <li>
                        Finished Size:&nbsp;&nbsp;
                        <span>{this.state.finished_size}</span>
                      </li>
                      <li>
                        Year Built:&nbsp;&nbsp;
                        <span>{this.state.year_built}</span>
                      </li>
                      <li>
                        Nearby Schools:&nbsp;&nbsp;
                        <span>{this.state.school}</span>
                        </li>
                    </ul>
                    <a target="_blank" href={this.state.url}>Get Directions</a>
                    {localStorage.getItem("email")?
                        (<button type="button" className="btn btn-primary mt-3 btnNew" data-id={this.props.year_built} onClick={this.saveHouse}>Save</button>)
                        :""
                        }
                    </div>):""}
                </div>
              </div>
            </div>
          </div>
        </Jumbotron>

      )
    }

  }
}
export default Result;