import React, { Component } from 'react';
import {Layout, AppBar, Navigation, Panel, Link} from 'react-toolbox';
import {LinkContainer} from 'react-router-bootstrap';
import Header from './header/Header';
import Sidebar from './Sidebar'
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <Layout style={{background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'}}>
        <Sidebar/>
        <Panel>
          <Header title="Connection"/>
        </Panel>
      </Layout>
    );
  }
}
