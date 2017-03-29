import React, { Component } from 'react';
import {AppBar, Link, FontIcon, Navigation} from 'react-toolbox';
import {LinkContainer} from 'react-router-bootstrap';

const Header = (props) => {
	return (
		<AppBar title={props.title}>
			<Navigation type='horizontal'>
				<FontIcon value='more_vert'/>
      </Navigation>
    </AppBar>
	);
}

export default Header;