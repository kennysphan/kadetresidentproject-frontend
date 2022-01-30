import { Button } from 'react-bootstrap';
import history from '../history';
import React, { Component } from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class AlgorithmStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList: [],
      modal: false,
      activeItem: {
        Status: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/algorithm/api/")
      .then((res) => this.setState({ statusList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.email) {
      axios
        .put(`/algorithm/api/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/algorithm/api/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/algorithm/api/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = {Status: "" };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderStatus = () => {
    const newItems = this.state.statusList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`mr-2`}
        >
          {item.Status}
        </span>

      </li>
    ));
  };


  render() {
    return (
      <main className="container">
        <h3 className="text-center">Scheduling Algorithm Now Running</h3>
		    <h5 className="text-center">(this may take several minutes, status will appear below when complete)</h5>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
                {this.renderStatus()}
            </div>
          </div>
        </div>
        <div className="text-center">
          <form>
          <Button variant="btn btn-success" onClick={() => history.push('/post_algorithm')}>view generated schedule</Button>
          </form>
        </div>
      </main>
    );
  }
}

export default AlgorithmStatus;