import React from "react";
import "./nav.css";


function clearStorage(){
  // remove
  console.log("clearing storage");
  localStorage.removeItem('userName');
    
     // remove all
  localStorage.clear();
}
function Nav() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary home">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
      
      <a className="navbar-brand" href="/">
        HomeMaven
      </a>
      </li>
      <li class="nav-item">
      <a className="navbar-brand" href="/search">
        Search Home
      </a>
      </li>
      <li class="nav-item">
      <a className="navbar-brand" href="/save">
        Saved Homes
      </a>
      </li>
      </ul>
      <ul class="navbar-nav">
      <li class="nav-item">
      <a className="navbar-brand" href="/contact">
        Contact
      </a>
      </li>
      <li class="nav-item">
      <a className="navbar-brand" href="/login">
        Login
      </a>
      </li>
      <li class="nav-item">
      <a className="navbar-brand" href="/" onClick={clearStorage}>
        Logout
      </a>
      {localStorage.getItem("name")?<span style={{color:"white"}}>Welcome {localStorage.getItem("name")}</span>:""}
      </li>
      </ul>
     
    </nav>
  );
}

export default Nav;
