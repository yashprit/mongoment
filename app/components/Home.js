import React, { Component } from 'react';
import {Layout, AppBar, Navigation, Panel, Link} from 'react-toolbox';
import {LinkContainer} from 'react-router-bootstrap';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <Layout style={{background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'}}>
        <Panel>
          <AppBar>
            <LinkContainer to="/">
              <Link label="Mongoment"/>
            </LinkContainer>
            <Navigation type='horizontal'>
              <LinkContainer to="/login">
                <Link label="Login"/>
              </LinkContainer>
              <LinkContainer to="/register">
                <Link label="Registration"/>
              </LinkContainer>
              <LinkContainer to="/connections">
                <Link label="Database"/>
              </LinkContainer>
            </Navigation>
          </AppBar>
        </Panel>
      </Layout>
    );
  }
}
