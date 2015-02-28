import React from 'react';
import Reflux from 'reflux';
import Fencer from 'models/fencer';
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
							<li>
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
