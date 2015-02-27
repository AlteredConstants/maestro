import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default React.createClass({
	render() {
		return (
			<section>
				<ul>
					<li><Link to="fencers">Fencers</Link></li>
					<li><Link to="events">Events</Link></li>
				</ul>
			</section>
		);
	}
});
