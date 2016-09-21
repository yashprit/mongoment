import React, { Component, PropTypes } from 'react';
import {Input, Button, Link, Layout, Panel, AppBar} from 'react-toolbox';

export default class Connetions extends Component {
  static propTypes = {
    connections: PropTypes.array.isRequired
  };

   state = { name: '', ip: '', multiline: '', email: '', hint: '' };

   componentWillMount(){
    this.props.list();
   }

   handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
   }

   saveConnection = () => {
    const {
      name,
      ip,
      port,
      db
    } = this.state;
    this.props.save(name, ip, port, db);
  }

  testConnecction = () => {
  	const {
      ip,
      port,
      db
    } = this.state;
    this.props.test(ip, port, db);
  }

  renderForm(){
    return(
      <div>
        <Input required type='text' label='Connection Name' name='name' icon='person_outline' value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
        <Input required type='text' label='IP' name='ip' icon='computer' value={this.state.ip} onChange={this.handleChange.bind(this, 'ip')}/>
        <Input required type='text' label='Port' name='port' icon='vpn_key'value={this.state.port} onChange={this.handleChange.bind(this, 'port')} hint='Default is 27071'/>
        <Input required type='text' label='Database Name' name='db' icon='data_usage' value={this.state.db} onChange={this.handleChange.bind(this, 'db')}/>
        <Button icon='add' label='Add Connection' flat accent onClick={this.saveConnection}/>
        <Button icon='send' label='Test Connection' flat onClick={this.testConnecction}/>
      </div>
    );
  }

  renderList(){

  }

  render() {
  	const {
  		connections
  	} = this.props;

    console.log(this.props)
    return(
       <Layout>
        <Panel>
          <AppBar>
            <Link href="/" label="Mongoment"/>
          </AppBar>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
          {connections.lenth > 0? this.renderConnection() : this.renderForm()}
          </div>
        </Panel>
      </Layout>
    )
  }
}