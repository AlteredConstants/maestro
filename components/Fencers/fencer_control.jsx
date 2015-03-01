import React from 'react';
import FencerActions from 'actions/fencer_actions';

export default React.createClass({
	removeFencer(id) {
		FencerActions.remove(id);
	},

	render() {
		const fencer = this.props.fencer;
		return (
			<span>
				<button	onClick={this.removeFencer.bind(this, fencer.getId())}>
					Remove
				</button>
				{' ' + fencer.getName()}
			</span>
		);
	}
});
