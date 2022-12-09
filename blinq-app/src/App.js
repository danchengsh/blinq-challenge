import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderBar from './components/header-bar/header-bar.component';
import Homepage from './components/homepage/homepage.component';
import FooterBar from './components/footer-bar/footer-bar.component';

const App = () => {
  return (
    <Fragment>
      <HeaderBar />
      <Routes>
        <Route path='/' element={<Homepage />}>
        </Route>
      </Routes>
      <FooterBar />
    </Fragment>
  );
}

export default App;
