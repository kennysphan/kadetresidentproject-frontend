import React, { Component } from "react";


import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theSchedule: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/schedule/api/")
      .then((res) => this.setState({ theSchedule: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle(); // modal closes

    if (item.id) {
      axios
        .put(`/schedule/api/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/schedule/api/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/schedule/api/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { RotationType: "" };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderSchedule = () => {
    const newItems = this.state.theSchedule;

    return newItems.map((item) => (
      <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span
        className={`mr-2`}
      >

      </span>

      }
    </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h3 className="text-center">Rotation list</h3>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">

              </div>
                {this.renderSchedule()}
            </div>

          </div>
        </div>

      </main>
    );
  }
}

export default Schedule;