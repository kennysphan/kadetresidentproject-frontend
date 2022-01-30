import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import React, { Component } from "react";
import axios from "axios";

  /*
      old one
    */

class Requests extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          requestList: [],
          
        };
    }
    
    componentDidMount() {
        this.refreshList();
    }
    
    refreshList = () => {
        axios
          .get("/requests/api/")
          .then((res) => this.setState({ requestList: res.data }))
          .catch((err) => console.log(err));
    };

    renderRequests = () => {
        const newItems = this.state.requestList;

        return newItems.map((item) => (
            <Accordion>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div className={`mr-2`}>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey={item.email}
                      title="Click to view resident request details"
                    >
                      +
                    </Accordion.Toggle>
                    {item.email}
                  </div>
    
                </Card.Header>
                <Accordion.Collapse eventKey={item.id}>
                    <Card.Body className="text-muted">
                      <div  className="list-group border-0">
                        <span className="list-group-item border-0">
                          Request 1: {item.requestOne}
                        </span>
                        <span className="list-group-item border-0">
                          Request 2: {item.requestTwo}
                        </span>
                        <span className="list-group-item border-0">
                          Request 3: {item.requestThree}
                        </span>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
              </Card>
            </Accordion>
        ));
      };

    render() {
        return (
            <main className="container">
                <h3 className="text-center">Schedule Requests</h3>
                <div className="row">
                    <div className="col-md-8 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                    

                    <ul className="list-group list-group-flush border-top-0">
                        {this.renderRequests()}
                    </ul>


                    
                    </div>
                    </div>
                </div>
            </main>
        );
    };
}
export default Requests;