import React from 'react';
import FencerSelectList from './fencer_select_list';

export default function Fencers(props) {
  return (
    <section>
      <p>The following fencers are part of the event.</p>
      <FencerSelectList {...props} />
    </section>
  );
}
