import React, { Component, PropTypes } from 'react';
import {Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

const REDIRECT_URL = 'connections';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Login extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    login: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const userEmail = document.getElementById('username').value;
    const password = document.getElementById('userpassword').value;
    this.props.login(userEmail, password, REDIRECT_URL);
  }

  render() {
    console.log(this.props);
    const {isLoading} = this.props;
    return (
      <form>
        <FieldGroup
          id="username"
          type="email"
          label="Email Address"
          placeholder="User Email"/>
        <FieldGroup
          id="userpassword"
          type="password"
          label="Password"
          placeholder="password"/>
        <Button 
          type="submit" 
          bsStyle="primary" 
          onClick={!isLoading? this.handleClick : null}
          disabled={isLoading}>{isLoading? 'Loading...': 'Logins'}</Button>
      </form>
    );
  }
}

export default Login;
