import React from 'react';
import {Card,CardTitle,CardText,CardActions,Button} from 'react-toolbox';

const Connection = (props) => {

  const uri = `mongdb://${props.ip}:${props.port}/${props.db}`

  return (
    <Card>
      <CardTitle title={props.name}/>
      <CardTitle
        title="Title goes here"
        subtitle="Subtitle here"
      />
      <CardText>{uri}</CardText>
      <CardActions>
        <Button label="Action 1" />
        <Button label="Action 2" />
      </CardActions>
    </Card>
  )
}

export default Connection;