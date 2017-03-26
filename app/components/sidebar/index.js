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
					<div className={Style.menuSection}>
						<h3>Heading</h3>
						<ul>
							<li>
								<a>
									<FontIcon value='turned_in_not'/>
									<span className={Style.text}>Home</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</NavDrawer>
	)
}

export default Sidebar;