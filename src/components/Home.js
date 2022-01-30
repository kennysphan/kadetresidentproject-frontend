import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from '../history';
//import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="text-center">
                    <h3>Welcome!</h3>
                    <p class="text-muted">Get started with our Resident Scheduler!</p>
                    <form>
                        <Button variant="btn btn-success" onClick={() => history.push('/Settings')}>Click here to get started</Button>
                    </form>
                </div>
            </div>
        );
    }
}