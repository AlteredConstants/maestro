import React from 'react';
import FencerStateMixin from './mixins/fencer_state';
import Fencer from 'models/fencer';
import FencerActions from 'actions/fencer_actions';

export default React.createClass({
	mixins: [FencerStateMixin],

	addFencer() {
		const fencerNode = this.refs.new.getDOMNode();
		const name = fencerNode.value;
		fencerNode.value = '';
		FencerActions.add(new Fencer({ name }));
	},

	removeFencer(event) {
		const id = parseInt(event.target.value);
		FencerActions.remove(id);
	},

	render() {
		return (
			<section>
				<h1>Fencers</h1>
				<ul>
					{
						this.state.fencers.map(fencer =>
							<li key={fencer.getId()}>
								<button	onClick={this.removeFencer}	value={fencer.getId()}>
									Remove
								</button>
								{' ' + fencer.getName()}
							</li>
						)
					}
					<li><input ref="new" /> <button onClick={this.addFencer}>Add</button></li>
				</ul>
			</section>
		);
	}
});
