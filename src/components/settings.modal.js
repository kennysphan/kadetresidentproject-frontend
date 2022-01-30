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
  Label,
  Row,
  Col
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

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Overall Schedule settings</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="settings-description">Description</Label>
              <Input
                type="text"
                id="settings-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter schedule description"
              />
            </FormGroup>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="settings-StartSchedule">Schedule start date</Label>
                  <Input
                    type="date"
                    id="settings-StartSchedule"
                    name="StartSchedule"
                    value={this.state.activeItem.StartSchedule}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="settings-EndSchedule">Schedule end date</Label>
                  <Input
                    type="date"
                    id="settings-EndSchedule"
                    name="EndSchedule"
                    value={this.state.activeItem.EndSchedule}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="DatesSet"
                  checked={this.state.activeItem.DatesSet}
                  onChange={this.handleChange}
                />
                Schedule Set
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}