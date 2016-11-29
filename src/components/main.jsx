import React from 'react';
import MainNavigation from './main-navigation';

export default React.createClass({
  render() {
    return (
      <section>
        <h1>Maestro</h1>
        <MainNavigation />
        {this.props.children}
      </section>
    );
  }
});
