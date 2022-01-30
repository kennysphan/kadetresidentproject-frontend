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
} from "reactstrap";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownList: [],
      activeDict: this.props.activeDict,
      activeResident: this.props.activeResident,
      weekKey: this.props.weekKey,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/schedule/api/drop_down/")
      .then((res) => this.setState({ dropDownList: res.data }))
      .catch((err) => console.log(err));
  };

  renderDropDown = () => {
    const newItems = this.state.dropDownList;
      return newItems.filter(newItems => newItems.rotationWeek == this.state.weekKey).map((week) => (
        week.availableRotations.map((rotation) => (
          <option>{rotation}</option>
        ))
      ));
  };
  

  handleChange = (e) => {
    let { name, value } = e.target;

    console.log('activeDict before: ' + JSON.stringify(this.state.activeDict))

    const activeDict = { ...this.state.activeDict, [name]: value };

    console.log('activeDict after: ' + JSON.stringify(activeDict))

    this.setState({ activeDict });

    this.setState(prevState => ({
      activeResident: {
        ...prevState.activeResident,
        generatedSchedule: activeDict
      }
     }));
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Rotations</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="resident-rotation">Assign Rotation</Label>
              <Input
                type="select"
                id="resident-rotation"
                name={this.state.weekKey}
                value={this.state.activeDict[this.state.weekKey]}
                onChange={this.handleChange}>
                  <option>available</option>
                  <option>VACATION</option>
                  {this.renderDropDown()}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeResident)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}