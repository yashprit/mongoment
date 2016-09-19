import React, { Component, PropTypes } from 'react';
import {Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

const REDIRECT_URL = 'login';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Registration extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    registration: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('userpassword').value;
    this.props.registration(username, email, password, REDIRECT_URL);
  }

  render() {
    const {isLoading} = this.props;
    return (
      <form>
        <FieldGroup
          id="username"
          type="text"
          label="Username"
          placeholder="Username"/>
        <FieldGroup
          id="email"
          type="text"
          label="Email"
          placeholder="Email Address"/>
        <FieldGroup
          id="userpassword"
          type="password"
          label="Password"
          placeholder="password"/>
        <Button 
          type="submit" 
          bsStyle="primary" 
          onClick={!isLoading? this.handleClick : null}
          disabled={isLoading}>{isLoading? 'Loading...': 'Register'}</Button>
      </form>
    );
  }
}

export default Registration;
