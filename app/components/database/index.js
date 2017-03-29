import React, { Component, PropTypes } from 'react';
import {Input, Button, ListItem, Layout, Panel, ListSubHeader, List, IconButton} from 'react-toolbox';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Editor, EditorState} from 'draft-js';
import Sidebar from '../sidebar';
import Header from '../header/Header';
import JSONTree from 'react-json-tree'
import brace from 'brace';
import AceEditor from 'react-ace';
import esprima from 'esprima';
import Style from './style';

import 'brace/mode/java';
import 'brace/theme/github';

export default class Connetions extends Component {
  static propTypes = {
    collections: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentWillMount(){
    this.props.connect(this.props.location.query.uri);
  }

  selectCollection(collectionName){
    this.props.getAllDocuments(this.props.location.query.uri, collectionName);
  }

  onChange(newValue){
    this.setState({value:newValue})
  }

  run(){
    const query = this.state.value;

    let objects = query.split('.');

    if(objects.length === 3) {
      const parsedQuery = esprima.parse(query);

      const argument = parsedQuery.body[0].expression.arguments;

      const parseArguments = argument.reduce((acc, value, key) => {
        if(value.type === "ObjectExpression") {
          const obj = value.properties.map(props => {
            console.log(props);
            return {
              [props.key.name]: props.value.value
            }
          });
          acc.concat(obj);
        } else if(value.type === "Literal") {
          acc.push(value.value.value);
        }
        return acc
      }, []);

      if(objects[0] === 'db') {
        const collectionName = objects[1];
        const methodName = objects[2].split('(')[0];
        this.props.run(this.props.location.query.uri, collectionName, methodName, parseArguments);
      }
    }
  }

  render() {
    const {editorState} = this.state;

    return(
      <Layout>
        <Sidebar>
          <List selectable ripple>
            <ListSubHeader caption='Collections' />
              {
                this.props.collections.map(value => {
                  return <ListItem 
                    caption={value.collectionName} 
                    leftIcon='keyboard_arrow_right' 
                    onClick={() => this.selectCollection(value.collectionName)}/>
                })
              }
          </List>
        </Sidebar>
        <Panel>
          <Header title="Database"/>
          <div className={Style.content}>
            <div className={Style.editorWrapper}>
              <div className={Style.editorControl}>
                <Button icon='play_arrow' label='Run' flat primary onClick={::this.run}/>
              </div>
              <div className={Style.editor}>
                <AceEditor
                  mode="javascript"
                  theme="github"
                  onChange={::this.onChange}
                  name="UNIQUE_ID_OF_DIV"
                  height="300px"
                  width="100%"
                  value={this.state.value}
                  editorProps={{$blockScrolling: true}}/>
              </div>
            </div>
            <div className={Style.resultWrap}>
              <div className={Style.panel}>
                <IconButton icon='favorite' accent />
                <IconButton icon='favorite' accent />
                <IconButton icon='favorite' accent />
              </div>
              <div className={Style.result}>
                <JSONTree data={this.props.documents}/>
              </div>
            </div>
          </div>
        </Panel>
      </Layout>
    )
  }
}