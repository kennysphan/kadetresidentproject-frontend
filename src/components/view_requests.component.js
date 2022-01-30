import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { Component } from "react";
import Modal from "./view_requests.modal";
import axios from "axios";

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestList: [],
      modal: false,
      activeItem: {
        email: "",
      },
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

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/requests/api/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/requests/api/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/requests/api/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { email: "" };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
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
                  eventKey={item.id}
                  title="Click to view resident request details"
                >
                  +
                </Accordion.Toggle>
                {item.email}
              </div>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => this.editItem(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey={item.id}>
                <Card.Body className="text-muted">
                  <div  className="list-group border-0">
                    <span className="list-group-item border-0">
                      {item.last_name}, {item.first_name}
                    </span>
                    <span className="list-group-item border-0">
                      PGY: {item.postGradLevel}
                    </span>
                    <span className="list-group-item border-0">
                      Request 1: {new Date(item.requestOne).toUTCString().slice(0,16)}
                    </span>
                    <span className="list-group-item border-0">
                      Request 2: {new Date(item.requestTwo).toUTCString().slice(0,16)}
                    </span>
                    <span className="list-group-item border-0">
                      Request 3: {new Date(item.requestThree).toUTCString().slice(0,16)}
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
              <div className="mb-4">
                <button 
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add resident request
                </button>
              </div>
                {this.renderRequests()}
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  };
}
export default Requests;
