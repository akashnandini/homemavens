import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";


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
        mapUrl: ""
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
            year_built: this.props.year_built ? this.props.year_built : this.state.year_built
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
        console.log("search home:  " + str);
        var str1 = str.split(",");

        console.log(str1[0], str1[1]);
        API.displayAddress(str1[0], str1[1])


            .then(response => {
                console.log("response:  " + JSON.stringify(response));
                this.setState({
                    address: response.data.property[0].address.oneLine,
                    county: response.data.property[0].area.countrysecsubd,
                    building_type: response.data.property[0].summary.propclass,
                    finished_size: response.data.property[0].building.size.livingsize,
                    year_built: response.data.property[0].summary.yearbuilt,
                    zipFlag: true
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
                console.log("response:  " + JSON.stringify(response));
                this.setState({
                    mapUrl: response.data.results[0].locations[0].mapUrl,
                });
                console.log("MapUrllllllllllllllllll  " + this.state.mapUrl);
            })
            .catch(err => console.log(err));

        this.render();
    }
    render() {

        if (!this.props.flag || this.zipFlag) {
            return (
                <Jumbotron>
                    <legend>Address Listing</legend>
                    <br></br>
                    <button type="button" className="btn btn-primary mt-3 btnNew" data-id={this.props.year_built} onClick={this.saveHouse}>Save</button>
                    <img src={this.props.mapUrl ? this.props.mapUrl : this.state.mapUrl} alt="MapUrl" />
                    <ul>

                        <li>

                            Address:
          <span>{this.props.add ? this.props.add : this.state.address}</span>
                        </li>
                        <li>
                            County:
          <span>{this.props.county ? this.props.county : this.state.county}</span>
                        </li>
                        <li>
                            building_type:
          <span>{this.props.building_type ? this.props.building_type : this.state.building_type}</span>
                        </li>
                        <li>
                            Levels:
          <span>{this.props.levels ? this.props.levels : this.state.levels}</span>
                        </li>
                        <li>
                            Finished Size:
          <span>{this.props.finished_size ? this.props.finished_size : this.state.finished_size}</span>
                        </li>
                        <li>
                            year_built:
          <span>{this.props.year_built ? this.props.year_built : this.state.year_built}</span>
                        </li>
                    </ul>
                    <br></br>



                </Jumbotron>

            )
        }

        else {
            return (
                <Jumbotron>

                    <div className="row">

                        <legend>Lisiting by ZipCode</legend>

                        <div className="col-md-4">
                            <br></br>
                            <ol>
                                {this.props.zipresults.map(item => (

                                    <li>

                                        <p onClick={() => { this.searchHome(item.address.oneLine); this.showMap(item.address.oneLine) }}>{item.address.oneLine}</p>

                                    </li>

                                ))}
                            </ol>
                        </div>
                        <div className="col-md-8">

                            <br></br>
                            <button type="button" className="btn btn-primary mt-3 btnNew" onClick={this.saveHouse}>Save</button>
                            <img src={this.props.mapUrl ? this.props.mapUrl : this.state.mapUrl} alt="MapUrl" />
                            <ul>

                                <li>
                                    Address:
          <span>{this.props.add ? this.props.add : this.state.address}</span>
                                </li>
                                <li>
                                    County:
          <span>{this.props.county ? this.props.county : this.state.county}</span>
                                </li>
                                <li>
                                    building_type:
          <span>{this.props.building_type ? this.props.building_type : this.state.building_type}</span>
                                </li>
                                <li>
                                    Levels:
          <span>{this.props.levels ? this.props.levels : this.state.levels}</span>
                                </li>
                                <li>
                                    Finished Size:
          <span>{this.props.finished_size ? this.props.finished_size : this.state.finished_size}</span>
                                </li>
                                <li>
                                    year_built:
          <span>{this.props.year_built ? this.props.year_built : this.state.year_built}</span>
                                </li>
                            </ul>

                        </div>
                    </div>
                </Jumbotron>

            )
        }

    }
}
export default Result;