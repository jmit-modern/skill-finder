import React from 'react';
import Header from '../components/layout/Header';

const LayoutDefault = ({ children }) => (
  <div className="container">
    <Header navPosition="right" className="reveal-from-bottom" />
    <main className="site-content">
      {children}
    </main>
  </div>
);

export default LayoutDefault;  