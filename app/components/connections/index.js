import React, { Component, PropTypes } from 'react';
import {Input, Button, Link, Layout, Panel, AppBar, Dialog} from 'react-toolbox';
import Header from '../header/Header';
import Sidebar from '../sidebar';
import ConnectionForm from './ConnectionForm';
import Connection from './Connection';
import {Grid, Row} from 'react-flexbox-grid';
import { withRouter } from 'react-router' 
import style from './connection.scss';

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

  connectDb = (uri) => {
    this.props.router.push({pathname: '/database', query: {uri: uri}});
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  renderWhenConnectionAvaiable(){
    const connections = this.props.connections.map((value, key) => {
      return <Connection {...value} connectDb={this.connectDb}/>
    });

    return (
      <Grid>
        <Row>{connections}</Row>
      </Grid>
    )
  }

  render() {
    return(
      <Layout>
        <Sidebar/>
        <Panel>
          <Header title="Connection"/>
          {this.renderWhenConnectionAvaiable()}
          <Button icon='add' floating accent onClick={this.handleToggle}/>
          <Dialog
            actions={this.actions}
            active={this.state.active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title='Add Connection'>
            <ConnectionForm/>
          </Dialog>
        </Panel>
      </Layout>
    )
  }
}

export default withRouter(Connetions);