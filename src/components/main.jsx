import React from 'react';
import MainNavigation from './main-navigation';

export default function Main({ children }) {
  return (
    <section>
      <h1>Maestro</h1>
      <MainNavigation />
      {children}
    </section>
  );
}

Main.propTypes = {
  children: React.PropTypes.element,
};
