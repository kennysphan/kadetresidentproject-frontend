import React, { Component } from "react"; 
import { Button } from 'react-bootstrap'; 
import history from '../history'; 
import axios from "axios"; 
 
export default class run_scheduler extends Component { 
    render() { 
        return ( 
            <div className="container"> 
                <div className="text-center"> 
                    <h3>Let the algorithm do its magic!</h3> 
                    <form onSubmit={this.handleSubmit}> 
                    <input className="btn btn-primary" type="submit" value="Run Scheduler !"/> 
                    </form> 
                </div> 
            </div> 
        ); 
    } 

handleSubmit = (item) => { 
    axios 
        .post("", item) 
        .then((res) => this.refreshList()); 
    }; 
} 

 