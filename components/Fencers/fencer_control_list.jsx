import React from 'react';
import Fencer from 'models/fencer';
import FencerActions from 'actions/fencer_actions';
import FencerControl from './fencer_control.jsx!';
import is from 'check-types';

export default React.createClass({
	addFencer() {
		const fencerNode = this.refs.new.getDOMNode();
		const name = fencerNode.value;
		fencerNode.value = '';
		FencerActions.add(new Fencer({ name }));
	},

	render() {
		const fencers = this.props.fencers;
		if (is.not.assigned(fencers)) {
			// TODO: Should probably have a spinner or such.
			return null;
		}
		return (
			<ul>
				{
					fencers.map(fencer =>
						<li key={'fencer-' + fencer.getId()}>
							<FencerControl fencer={fencer} />
						</li>
					)
					// TODO: Remove once we can update to React 0.13.
					.toArray()
				}
				<li><input ref="new" /> <button onClick={this.addFencer}>Add</button></li>
			</ul>
		);
	}
});
