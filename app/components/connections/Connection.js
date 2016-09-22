import React from 'react';
import {Card,CardTitle,CardText,CardActions,Button, Chip} from 'react-toolbox';

const Connection = (props) => {

  const uri = `mongodb://${props.ip}:${props.port}/${props.db}`

  return (
    <Card>
      <CardTitle title={props.name}>
        <Chip>{props.collections}</Chip>
      </CardTitle>
      <CardTitle
        title="Title goes here"
        subtitle="Subtitle here"
      />
      <CardText>{uri}</CardText>
      <CardActions>
        <Button label="Connect" onClick={() => props.connectDb(uri)}/>
        <Button label="Action 2" />
      </CardActions>
    </Card>
  )
}

export default Connection;