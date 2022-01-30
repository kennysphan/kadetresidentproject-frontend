import React, { Component } from "react";
import Modal from "./settings.modal";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSet: false,
      settingsList: [],
      modal: false,
      activeItem: {
        description: "",
        DatesSet: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/settings/api/")
      .then((res) => this.setState({ settingsList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/settings/api/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/settings/api/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/settings/api/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = {description: "", DatesSet: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displaySet = (status) => {
    if (status) {
      return this.setState({ viewSet: true });
    }

    return this.setState({ viewSet: false });
  };

  renderSettings = () => {
    const newItems = this.state.settingsList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`mr-2`}
        >
          {item.description}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>

        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h3 className="text-center">Current settings</h3>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">

              </div>

              <ul className="list-group list-group-flush border-top-0">
                {this.renderSettings()}
              </ul>
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
  }
}

export default Settings;