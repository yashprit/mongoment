import React from 'react';
import {NavDrawer, FontIcon} from 'react-toolbox';
import Style from './style';

const Sidebar = (props) => {
	return (
		<NavDrawer active permanentAt='md'>
			<div className={Style.sidebar}>
				<div className={Style.logo}>
					<a href="#">
						<FontIcon value='flight_takeoff'/>
						<span>Mongoment</span>
					</a>
				</div>
				<div className={Style.menu}>
					{props.children}
				</div>
			</div>
		</NavDrawer>
	)
}

export default Sidebar;