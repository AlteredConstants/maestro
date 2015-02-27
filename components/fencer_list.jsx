import React from 'react';
import Reflux from 'reflux';
import FencerStore from 'stores/fencer_store';
import FencerActions from 'actions/fencer_actions';

export default React.createClass({
	mixins: [Reflux.connect(FencerStore, "fencers")],

	getInitialState() {
		return { fencers: [] };
	},

	componentDidMount() {
		this.setState({ fencers: FencerStore.getAll() });
	},

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
			<section>
				<h1>Fencers</h1>
				<ul>
					{this.state.fencers.map(fencer =>
						<li>{fencer} <button onClick={this.removeFencer} value={fencer}>Remove</button></li>)}
					<li><input ref="new" /> <button onClick={this.addFencer}>Add</button></li>
				</ul>
			</section>
		);
	}
});
