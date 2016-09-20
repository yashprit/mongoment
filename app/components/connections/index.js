import React, { Component, PropTypes } from 'react';
import {Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class Connetions extends Component {
  static propTypes = {
    connections: PropTypes.array.isRequired
  };

   handleClick = () => {
    const name = document.getElementById('name').value;
    const ip = document.getElementById('ip').value;
    const port = document.getElementById('port').value;
    const db = document.getElementById('db').value;
    this.props.save(name, ip, port, db);
  }

  testConnecction = () => {
  	const name = document.getElementById('name').value;
    const ip = document.getElementById('ip').value;
    const port = document.getElementById('port').value;
    const db = document.getElementById('db').value;
    this.props.test(name, ip, port, db);
  }

  render() {
  	const {
  		connections
  	} = this.props;

  	if(connections.length > 0){
  		return (<div>This is connections Page</div>);
  	} else {
  		return (
  			<form>
	        <FieldGroup
	          id="name"
	          type="text"
	          label="Name"
	          placeholder="Connection Name"/>
	        <FieldGroup
	          id="ip"
	          type="text"
	          label="Address"
	          placeholder="Server Address"/>
	        <FieldGroup
	          id="port"
	          type="text"
	          label="Port"
	          placeholder="port default is 27017"/>
	        <FieldGroup
	          id="db"
	          type="text"
	          label="Database"
	          placeholder="Database name"/>
	        <Button 
	          bsStyle="primary" 
	          onClick={this.handleClick}>Save Connection</Button>
	        <Button 
	          bsStyle="primary" 
	          onClick={this.testConnection}>Test Connection</Button>
	      </form>
  		);
  	}
  }
}