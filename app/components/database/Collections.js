import React from 'react';
import {NavDrawer, List, ListItem, ListSubHeader} from 'react-toolbox';

const Collections = (props) => {
  return (
    <NavDrawer active pinned permanentAt='xxxl'>
      <List selectable ripple>
        <ListSubHeader caption='Collections' />
        {
          props.collections.map(value => {
            return <ListItem caption={value.collectionName} leftIcon='keyboard_arrow_right' />
          })
        }
      </List>
    </NavDrawer>
  );
}

export default Collections;