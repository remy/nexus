import React from 'react';

const SideBar = () => (
  <Fragment>
  <nav className="sidebar">
		<ul>
			<li><img src="/assets/img/menu-logo.gif" alt="NeXt Computer" /></li>
			<li><img src="/assets/img/menu-calendar.png" alt="Calendar" /></li>
			<li><img src="/assets/img/menu-recycle.gif" alt="Recycle" /></li>
			<li><button><img src="/assets/img/menu-www.gif" alt="WorldWideWeb Browser" /></button></li>
		</ul>
	</nav>
  </Fragment>
);

export default SideBar;
