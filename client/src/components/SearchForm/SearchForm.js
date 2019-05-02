import React,{ Component } from "react";
import Jumbotron from "../Jumbotron";
import { Input, TextArea, FormBtn } from "../Form";
import axios from "axios";
import Result from "../../pages/Result";
import API from "../../utils/API";
import SelectUSState from 'react-select-us-states';
import "./style.css"

class SearchForm extends Component {  
  state = {    
    address: "",
    county: "",
    flood:"",
    school:"",
    price:0,
    levels:0,
    building_type:"",
    finished_size:0,
    year_built:0,
    add:{},
    flag:false,
    ZIP:"",
    zipresults:[],
    zipFlag:false,
    mapUrl:"",
    place:"",
    url:""
  };

  constructor(props) {
    super(props); 
    this.setNewValue = this.setNewValue.bind(this);
  }
 
  setNewValue(newValue) {
    console.log('this is the State code:' + newValue);
    this.setState({
      place: newValue,     
    });
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,     
    });
  };

  searchHome = () => {
    console.log("search home");
    API.displayAddress(this.state.address,this.state.city,this.state.place)

      .then(response => {
        console.log("response:  "+ JSON.stringify(response));
        this.setState({
        address:response.data.property[0].address.oneLine,
        county:response.data.property[0].area.countrysecsubd,
        building_type:response.data.property[0].summary.propclass,        
        finished_size:response.data.property[0].building.size.livingsize,
        year_built:response.data.property[0].summary.yearbuilt,
        levels:response.data.property[0].summary.absenteeInd,
        url:"https://www.google.com/maps/place/"+response.data.property[0].address.oneLine,
        });
        
      })

      .catch(err => console.log(err));

   
    }    

    showMap = () => {
      console.log("search Map");
      API.displayMap(this.state.address+ " "+this.state.city)  
        .then(response => {
          console.log("response:  "+ JSON.stringify(response));
          this.setState({
            mapUrl:response.data.results[0].locations[0].mapUrl,          
          });
          console.log("MapUrllllllllllllllllll  "+this.state.mapUrl);
        })        
        .catch(err => console.log(err));
  
     
      }

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({      
      flag:true,
    
    });

    this.searchHome();
    this.showMap();
    this.showPrice();
     
  };

  showPrice(){
    var url = "https://api.estated.com/property/v3?token=g0u2vmspmXExqI4053XVqpEWm0V7Ct&address="+this.state.address+"&city="+this.state.city+"&state="+this.state.place;
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

  handleZipFormSubmit = event => {
    event.preventDefault();
    
    var url= "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?postalcode=" + this.state.ZIP + "&page=1&pagesize=20"
    
    console.log("Url=="+url);
    axios.get( url,{
      headers: {
        "apikey": "833ffeb2822b8ee5778f7b5073319970"
      }
    }).then(response => {
      console.log("response:  "+ JSON.stringify(response));
      this.setState({
         zipFlag:true,
         flag:true,
         zipresults:response.data.property
      });
        
    }) 
    
  };

render() {
  if(!this.state.flag)
  {
    return (
      <Jumbotron>
      
   
      <legend>Search Property By Address</legend>
      <form>
      <div class="form-group">
        <label for="address">Address</label>
            <Input
              value={this.state.address}
              onChange={this.handleInputChange}
              name="address"
              placeholder="Address (Required)"
            />
      </div>
      <div class="form-group">
      <label for="city">City</label>
      <Input
            value={this.state.city}
            onChange={this.handleInputChange}
            name="city"
            placeholder="City (Required)"
          />
      </div>
      <div class="form-group">
        <label for="place">State</label>
        <br></br>
        <SelectUSState 
        value={this.state.place}
        onChange={this.handleInputChange}
        name="place"
        id="myId" className="myClassName" onChange={this.setNewValue}/>
      </div>   
      
      <FormBtn onClick={this.handleFormSubmit} className="btn btn-primary mt-3">
       Search
      </FormBtn>
      </form>
      <br></br>
      <br></br>
      <p>OR</p>
      <legend>Search Property By Zip Code</legend>
      <form>
      <div class="form-group">
        
            <Input
              value={this.state.ZIP}
              onChange={this.handleInputChange}
              name="ZIP"
              placeholder="Enter ZIP CODE (Required)"
            />
      </div>
      <FormBtn onClick={this.handleZipFormSubmit} className="btn btn-primary mt-3">
       Search By ZIP
      </FormBtn>
      </form>
    </Jumbotron>
  );
  }
  
    else{
    return(
      <Result flag={this.state.zipFlag}
            add={this.state.address}
            county={this.state.county}
            levels={this.state.levels}
            building_type={this.state.building_type}
            finished_size={this.state.finished_size}
            year_built={this.state.year_built}
            zipresults={this.state.zipresults}
            price={this.state.price}
            school={this.state.school}
            mapUrl={this.state.mapUrl}
            url={this.state.url}
            

    />    
    )
    }
    
    
  
}
}
export default SearchForm;
