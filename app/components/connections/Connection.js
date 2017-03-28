import React from 'react';
import {Col} from 'react-flexbox-grid';
import {Card,CardTitle,CardText,CardActions,Button, Chip, Avatar} from 'react-toolbox';

const Connection = (props) => {

  const uri = `mongodb://${props.ip}:${props.port}/${props.db}`

  return (
    <Col xs>
      <Card>
        <CardTitle
          title={props.name}
          subtitle={`Total Collection are ${props.collections}`}/>
        <CardText>Connection Path is <code>{uri}</code></CardText>
        <CardActions>
          <Button accent icon='insert_link' label="Connect" onClick={() => props.connectDb(uri)}/>
          <Button icon='mode_edit' label="Edit Connection" />
        </CardActions>
      </Card>
    </Col>
  )
}

export default Connection;