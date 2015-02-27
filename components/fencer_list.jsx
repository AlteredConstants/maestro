import React from 'react';
import FencerActions from '../actions/fencer_actions';

var Index = React.createClass({
	addFencer() {
		const fencerNode = this.refs.new.getDOMNode();
		const fencer = fencerNode.value;
		fencerNode.value = '';
		FencerActions.add(fencer);
	},

	removeFencer(event) {
		const fencer = event.target.value;
		FencerActions.remove(fencer);
	},

	render() {
		return (
			<ul>
				{this.props.fencers.map(fencer =>
					<li>{fencer} <button onClick={this.removeFencer} value={fencer}>Remove</button></li>)}
				<li><input ref="new" /> <button onClick={this.addFencer}>Add</button></li>
			</ul>
		);
	}
});

export default Index;
