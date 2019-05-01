import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import result from "./result.css";

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
    url:""
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
      email:localStorage.getItem("email")

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
          levels:response.data.property[0].summary.levels,
          finished_size:response.data.property[0].building.size.livingsize,
          year_built:response.data.property[0].summary.yearbuilt,
          zipFlag:true,
          url:"https://www.google.com/maps/place/"+response.data.property[0].address.oneLine,
          });
          
      })

      .catch(err => console.log(err));
       this.render();
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
                <img src={this.props.mapUrl ? this.props.mapUrl : this.state.mapUrl} alt="MapUrl"/>
                    <ul style={{marginTop:"20px"}}>
                        <li>
                        Address:
                        <span>{this.props.add}</span>
                        </li>
                        <li>
                        County:
                        <span>{this.props.county}</span>
                        </li>
                        <li>
                        Building Type:
                        <span>{this.props.building_type }</span>
                        </li>
                        <li>
                        Levels:
                        <span>{this.props.levels }</span>
                        </li>
                        <li>
                        Finished Size:
                        <span>{this.props.finished_size }</span>
                        </li>
                        <li>
                        Year Built:
                        <span>{this.props.year_built}</span>
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
                  <div class="card-body" style={{ backgroundImage:"../../public/car14.jpg",  backgroundColor: "lightgrey",color: "black"}}>
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
                    (<div><img style={{marginLeft:"25px"}} src={this.props.mapUrl ? this.props.mapUrl : this.state.mapUrl} alt="MapUrl"/>
                    <ul>
                      <li>
                        Address:
                        <span>{this.state.address}</span>
                      </li>
                      <li>
                        County:
                        <span>{this.state.county}</span>
                      </li>
                      <li>
                        Building Type:
                        <span>{this.state.building_type}</span>
                      </li>
                      <li>
                        Levels:
                        <span>{this.state.levels}</span>
                      </li>
                      <li>
                        Finished Size:
                        <span>{this.state.finished_size}</span>
                      </li>
                      <li>
                        Year Built:
                        <span>{this.state.year_built}</span>
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