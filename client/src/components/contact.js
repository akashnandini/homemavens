import React, { Component } from "react";
import Jumbotron from "./Jumbotron";
import { Input, TextArea, FormBtn } from "./Form";
import axios from "axios";
import FirstPage from "../pages/FirstPage";
import NoMatch from "../pages/NoMatch";
import Result from "../pages/Result";
import API from "../utils/API";
import SelectUSState from 'react-select-us-states';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            name: '',
            saved: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        let target = e.target;
        //let value = target.type === 'checkbox' ? target.checked : target.value;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
        this.saveUser();
    }
    saveUser = event => {
        console.log("SAVE USERRRRRRRRRR");
        const dbUser = {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email
        };


        if (dbUser.name !== '' || dbUser.password !== '' || dbUser.email !== '') {

            console.log(dbUser)
            API.saveUser(dbUser)
                .then(res => {
                    console.log("save user")
                    console.log(res.status, res.statusText);
                    this.setState({
                        saved: true
                    });
                    event.target.name = "";
                    this.state.password = "";
                    this.state.email = "";
                })

                .catch(err => {
                    console.log(err);
                })
        }
        else {
            console.log("errorrrrr");
        }
    };

    render() {

        return (
            <Jumbotron>

                <legend>Contact Us</legend>
                <br></br>
                <form>
                    <div class="form-group">
                    <i class="fa fa-address-card" style={{color: "black",marginRight: "10px"}}></i><label for="full_name"> Office Address:</label>
                        <h6>19 Chestnut St, Edison, New Jersey, 08817</h6>
                    </div>                    
                    <div class="form-group">
                    <i class="fa fa-envelope" style={{color: "blue",marginRight: "10px"}}></i><label for="email">Email:</label>
                        <a href="#" style={{color:"white"}}><h6>homemavens@gmail.com</h6></a>
                    </div>
                    <div class="form-group">
                    <i class="fa fa-phone-square" style={{color: "green",marginRight: "10px"}}></i><label for="phone">Phone Number:</label>
                        <h6>+1 201-873-3626</h6>
                    </div>
                    
                </form>

            </Jumbotron>
        );
    }
}
export default SignUpForm;
