import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { ListItem,List } from "../components/List";

export function Result(props) {
    
      return(
        

         
          <List>
          <ListItem>
            
            Address:
            <span>{props.add}</span>
            
          </ListItem>
          <ListItem>
            
          County:
          <span>{props.county}</span>
            
          </ListItem>
         
          
          <ListItem>
          building_type:
          <span>{props.building_type}</span>
          </ListItem>
          <ListItem>
          Levels:
          <span>{props.levels}</span>
          </ListItem>
          <ListItem>
          Finished Size:
          <span>{props.finished_size}</span>
          </ListItem>
          <ListItem>
          year_built:
          <span>{props.year_built}</span>
          </ListItem>
          </List>
      )
}

export default Result;