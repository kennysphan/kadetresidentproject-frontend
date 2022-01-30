import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    const checkInput = () => {
      onSave(this.state.activeItem)
    };

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Resident Vacation Requests</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">Resident's email address</Label>
              <Input
                type="email"
                id="email-address"
                name="email"
                value={this.state.activeItem.email}
                onChange={this.handleChange}
                placeholder="Enter email address"
              />
            </FormGroup>
            <FormGroup>
              <Label for="first-name">First name</Label>
              <Input
                type="text"
                id="first-name"
                name="first_name"
                value={this.state.activeItem.first_name}
                onChange={this.handleChange}
                placeholder="Enter first name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="last-name">Last name</Label>
              <Input
                type="text"
                id="last-name"
                name="last_name"
                value={this.state.activeItem.last_name}
                onChange={this.handleChange}
                placeholder="Enter last name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="postGradLevel">Post graduate year level</Label>
              <Input
                type="select"
                id="PGY"
                name="postGradLevel"
                value={this.state.activeItem.postGradLevel}
                onChange={this.handleChange}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="first-request">Resident's first request</Label>
              <Input
                type="date"
                id="first-request"
                name="requestOne"
                value={this.state.activeItem.requestOne}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="second-request">Resident's second request</Label>
              <Input
                type="date"
                id="second-request"
                name="requestTwo"
                value={this.state.activeItem.requestTwo}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="third-request">Resident's third request</Label>
              <Input
                type="date"
                id="third-request"
                name="requestThree"
                value={this.state.activeItem.requestThree}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={checkInput}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}