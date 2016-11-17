import React, { Component, PropTypes } from 'react';
import {Input, Button, Link, Layout, Panel, AppBar, Dialog} from 'react-toolbox';
import Connection from './Connection';
import {Grid, Row, Col} from 'react-flexbox-grid';
import { withRouter } from 'react-router' 
import style from './connection.scss';

console.log(style)

class Connetions extends Component {
  static propTypes = {
    connections: PropTypes.array.isRequired
  };

   state = { name: '', ip: '', multiline: '', email: '', hint: '', active: false};

   actions = [
    { label: "Add Connection", icon:'add', accent: true, onClick: this.saveConnection },
    { label: "Test Connection", icon:'send', onClick: this.testConnecction }
  ];

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
      <Row>
        <Col xs={12}>
          <Input required type='text' label='Connection Name' name='name' icon='person_outline' value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
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
    );
  }

  connectDb = (uri) => {
    this.props.router.push({pathname: '/database', query: {uri: uri}});
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  renderWhenConnectionAvaiable(){
    const connections = this.props.connections.map((value, key) => {
      return <Col xs><Connection {...value} connectDb={this.connectDb}/></Col>
    });

    return (
      <Panel>
        <AppBar>
          <Link href="/" label="Mongoment"/>
        </AppBar>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
          <Grid>
            <Row>{connections}</Row>
            <Button icon='add' floating accent onClick={this.handleToggle}/>
          </Grid>
        </div>
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Add Connection'>
          {this.renderForm()}
        </Dialog>
      </Panel>
    )
  }

  renderWhenConnectionEmpty(){
    return (
      <div className={style['connection__empty']}>
        <div className={style['connection__empty--add']}>
          <Button icon='note_add' floating accent onClick={this.handleToggle}/>
        </div>
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Add Connection'>
          {this.renderForm()}
        </Dialog>
      </div>
    )
  }

  render() {
    return this.props.connections.length > 0? this.renderWhenConnectionAvaiable() : this.renderWhenConnectionEmpty();
  }
}

export default withRouter(Connetions);