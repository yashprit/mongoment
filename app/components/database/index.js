import React, { Component, PropTypes } from 'react';
import {Input, Button, Link, Layout, Panel, AppBar, NavDrawer} from 'react-toolbox';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Collections from './Collections';
import {Editor, EditorState} from 'draft-js';

export default class Connetions extends Component {
  static propTypes = {
    collections: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  componentWillMount(){
    this.props.connect(this.props.location.query.uri);
  }

  render() {
    const {editorState} = this.state;

    return(
      <Layout>
        <NavDrawer active pinned permanentAt='xxxl'>
          <Collections collections={this.props.collections}/>
        </NavDrawer>
        <Panel>
          <AppBar>
            <Link href="/" label="Mongoment"/>
          </AppBar>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            <Grid>
              <div style={{height:300}}>
                <Editor editorState={editorState} onChange={this.onChange} />;
              </div>
            </Grid>
          </div>
        </Panel>
      </Layout>
    )
  }
}