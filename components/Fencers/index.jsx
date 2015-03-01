import React from 'react';
import FencerStateMixin from '../mixins/fencer_state';
import Fencer from 'models/fencer';
import FencerActions from 'actions/fencer_actions';
import FencerControl from './fencer_control.jsx!';
import is from 'check-types';

export default React.createClass({
	mixins: [FencerStateMixin],

	addFencer() {
		const fencerNode = this.refs.new.getDOMNode();
		const name = fencerNode.value;
		fencerNode.value = '';
		FencerActions.add(new Fencer({ name }));
	},

	render() {
		const fencers = this.state.fencers;
		let renderedFencers;
		if (is.assigned(fencers)) {
			renderedFencers = this.state.fencers.map(fencer =>
				<li key={'fencer-' + fencer.getId()}>
					<FencerControl fencer={fencer} />
				</li>
			);
		}
		return (
			<section>
				<h1>Fencers</h1>
				<ul>
					{renderedFencers}
					<li><input ref="new" /> <button onClick={this.addFencer}>Add</button></li>
				</ul>
			</section>
		);
	}
});
