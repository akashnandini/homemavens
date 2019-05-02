import React, { Component } from "react";
import Jumbotron from "./Jumbotron";
import { Input, TextArea, FormBtn } from "./Form";
import axios from "axios";
import FirstPage from "../pages/FirstPage";
import NoMatch from "../pages/NoMatch";
import Result from "../pages/Result";
import API from "../utils/API";
import savedHomes from "../pages/savedHomes";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password:'',
            flag: false,
            user: [],
            usr: []
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
        this.loadUser();

    }
    loadUser = () => {
        console.log("Ekhane")
        API.getUser()
            .then(res => {
                console.log("***********data" + JSON.stringify(res.data));
                if (document.getElementById("email-login").value !== '') {
                    console.log("find user!");
                    this.setState({ user: res.data });
                    this.findUser();
                } else {
                    console.log("oh no");
                    document.getElementById("error").innerHTML = "Please enter a valid email address or password";
                }

            }
            )
            .catch(err => console.log(err));


    };


    findUser() {
        this.setState({ usr: this.state.user.filter(usrs => (usrs.email === this.state.email) && (usrs.password === this.state.password)) });
        console.log(this.state.usr[0]);
        if (this.state.usr[0] != undefined) {
            console.log("its undefined man");
            if ((this.state.usr[0].name != '')) {
                this.setState({ flag: true });
                localStorage.setItem("email", this.state.usr[0].email);
                localStorage.setItem("name", this.state.usr[0].name)
            }
            else {
                console.log("no User");
                document.getElementById("error").innerHTML = "Please enter valid email address or password";
                //document.getElementById("email-login").value="";
               
            }
       } else {
           document.getElementById("error").innerHTML = "Please enter a valid email address or password";
        }

    }

    handleBlur(){
        document.getElementById("error").innerHTML="";
    }

    render() {

        return (
            <Jumbotron>
                <legend>Sign In</legend>
                <form>
                    <div class="form-group">
                    <label for="email">Email</label>
                        <Input
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            name="email"
                            id="email-login"
                            placeholder="Enter your Email (Required)"
                            onBlur={this.handleBlur}
                        />
                        <label for="password">Password</label>
                        <Input
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name="password"
                            id="password-login"
                            placeholder="Enter your Password (Required)"
                            type="password"
                        />
                    </div>

                    <FormBtn onClick={this.handleFormSubmit} className="btn btn-primary mt-3">
                        Submit
                    </FormBtn>

                    <span style={{ marginLeft: "10px" }}>Don't have an account. Please <a href="/register">sign up </a>here</span>
                    <br></br>
                    <span id="error" style={{marginLeft:"10px"}}></span>

                    {(this.state.flag) ?
                        (
                            <div class="card" style={{ width: "500px" }}>
                                <div class="card-header" style={{ backgroundColor: "rgb(43, 43, 82)", color: "white" }}>
                                    Welcome {this.state.usr[0].name}
                                </div>
                                <div class="card-body" style={{ backgroundColor: "lightgrey", color: "black" }}>
                                    <a href="/save"> <button type="button" className="btn btn-success mt-3">View Saved Homes</button></a>
                                </div>
                            </div>
                        ) : (
                            <h3></h3>
                        )}

                </form>
            </Jumbotron>
        );
    }
}

export default SignUpForm;
