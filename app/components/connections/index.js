import React, { Component, PropTypes } from 'react';
import {Input, Button, Link, Layout, Panel, AppBar, Dialog} from 'react-toolbox';
import Header from '../header/Header';
import Sidebar from '../sidebar';
import Connection from './Connection';
import {Grid, Row, Col} from 'react-flexbox-grid';
import { withRouter } from 'react-router' 
import style from './connection.scss';

class Connetions extends Component {
  static propTypes = {
    connections: PropTypes.array.isRequired
  };

  state = { name: '', ip: '', multiline: '', email: '', hint: '', active: false};

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

  connectDb = (uri) => {
    this.props.router.push({pathname: '/database', query: {uri: uri}});
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  actions = [
    { label: 'Add Connection', icon:'add', accent: true, onClick: this.saveConnection },
    { label: 'Test Connection', icon:'send', onClick: this.testConnecction }
  ];

  renderWhenConnectionAvaiable(){
    const connections = this.props.connections.map((value, key) => {
      return <Connection {...value} connectDb={this.connectDb}/>
    });

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
        <Grid>
          <Row>{connections}</Row>
          <div className={style["button__add"]}>
            <Button icon='add' label='Add Connection' accent onClick={this.handleToggle}/>
          </div>
        </Grid>
      </div>
    )
  }

  render() {
    return (
      <Layout>
        <Panel>
          <Header title="Connection"/>
          {this.renderWhenConnectionAvaiable()}
          <Dialog
            actions={this.actions}
            active={this.state.active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title='Add Connection'>
            <Row>
              <Col xs={12}>
                <Input required 
                  type='text' 
                  label='Connection Name' 
                  name='name' 
                  icon='person_outline' 
                  onChange={this.handleChange.bind(this, 'name')}/>
              </Col>
              <Col xs={12}>
                <Input required 
                  type='text' 
                  label='IP' 
                  name='ip' 
                  icon='computer' 
                  onChange={this.handleChange.bind(this, 'ip')}/>
              </Col>
              <Col xs={12}>
                <Input required 
                  type='text' 
                  label='Port' 
                  name='port' 
                  icon='vpn_key' 
                  hint='Default is 27071'
                  onChange={this.handleChange.bind(this, 'port')}/>
              </Col>
              <Col xs={12}>
                <Input required 
                  type='text' 
                  label='Database Name' 
                  name='db' 
                  icon='data_usage' 
                  onChange={this.handleChange.bind(this, 'db')}/>
              </Col>
            </Row>
          </Dialog>
        </Panel>
      </Layout>
    )
  }
}

export default withRouter(Connetions);