import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

const ConnectionForm = (props) => {
	return (
		<Row>
      <Col xs={12}>
        <Input required 
          type='text' 
          label='Connection Name' 
          name='name' 
          icon='person_outline' 
          value={this.state.name} 
          onChange={this.handleChange.bind(this, 'name')}/>
      </Col>
      <Col xs={12}>
        <Input required type='text' label='IP' name='ip' icon='computer' value={this.state.ip} onChange={this.handleChange.bind(this, 'ip')}/>
      </Col>
      <Col xs={12}>
        <Input required type='text' label='Port' name='port' icon='vpn_key'value={this.state.port} onChange={this.handleChange.bind(this, 'port')} hint='Default is 27071'/>
      </Col>
      <Col xs={12}>
        <Input required type='text' label='Database Name' name='db' icon='data_usage' value={this.state.db} onChange={this.handleChange.bind(this, 'db')}/>
      </Col>
    </Row>
	)
}

export default ConnectionForm;