import React from 'react';
import {NavDrawer} from 'react-toolbox';
import Style from './style';

const Sidebar = (props) => {
	return (
		<NavDrawer active permanentAt='md'>
			<div className={Style.sidebar}>
				<div className={Style.logo}>
					<a href="#">
						<span>Mongoment</span>
					</a>
				</div>
				<div className={Style.menu}>
					<div className={Style.menuSection}>
						<h3>Heading</h3>
						<ul>
							<li>Home</li>
						</ul>
					</div>
				</div>
			</div>
		</NavDrawer>
	)
}

export default Sidebar;