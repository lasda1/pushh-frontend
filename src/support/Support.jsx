import React from "react";
import Grid from "@material-ui/core/Grid";

import Axios from "axios";
import {
  Container,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  FormText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { TextField } from "@material-ui/core";

class Support extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleTaskDescriptionChange = this.handleTaskDescriptionChange.bind(
      this
    );
    this.state = {
      id: this.props.match.params ? this.props.match.params.id : 0,
      taskName: "",
      description: "",
      user: {
        Name: "",
      },
      userFlag: false,
      email: "",
      file: null,
    };
  }
  handleNameChange = (e) =>
    this.setState({
      user: {
        Name: e.target.value,
      },
    });
  handleTaskNameChange = (e) => {
    this.setState({
      taskName: e.target.value,
    });
  };
  handleTaskDescriptionChange = (e) =>
    this.setState({
      description: e.target.value,
    });
  handleClientEmailChange = (e) =>
    this.setState({
      email: e.target.value,
    });
  async componentDidMount() {
    if (this.state.id) {
      const res = await Axios.get(
        `http://localhost:8000/user/${this.state.id}`
      );
      if (res.data) {
        this.setState((state) => {
          return { user: res.data, userFlag: true };
        });
      }
    }
  }
  submit = async () => {
    const data = new FormData();
    let image;
    data.append("file", this.state.file);
    data.append("upload_preset", "xbjk5axd");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ddiv4viqj/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    if (!file.error) {
      image = file.secure_url;
    }
    console.log(image);
    const objectTosend = {
      title: this.state.taskName,
      description: this.state.description,
      clientName: this.state.user.Name,
      file: file.secure_url,
      clientId: this.state.id ? this.state.id : 0,
      email: this.state.email ? this.state.email : this.state.user.email,
    };
    const postResponse = await Axios.post(
      `http://localhost:8000/support`,
      objectTosend
    );
    console.log(postResponse.data);
  };
  fileSelecterHandler = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <h1>Hello</h1>
          <Form>
            <FormGroup>
              <TextField
                type="text"
                name="Name"
                placeholder="Name"
                disabled={this.state.userFlag}
                value={this.state.user.Name ? this.state.user.Name : ""}
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                type="text"
                name="Task-Name"
                placeholder="Task Name"
                value={this.state.taskName ? this.state.taskName : ""}
                onChange={this.handleTaskNameChange}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                value={this.state.description ? this.state.description : ""}
                onChange={this.handleTaskDescriptionChange}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                type="text"
                name="Email"
                placeholder="Email"
                disabled={this.state.userFlag}
                value={
                  this.state.user.email
                    ? this.state.user.email
                    : this.state.email
                }
                onChange={this.handleClientEmailChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="file">Upload File</Label>
              <Input
                type="file"
                name="max"
                id="exampleEmail"
                onChange={this.fileSelecterHandler}
              />
            </FormGroup>
            <FormGroup>
              <Button variant="contained" onClick={this.submit}>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </Grid>
      </Grid>
    );
  }
}
export default Support;
