import React from 'react';
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {

  return (
    <BrowserRouter>
      <Container maxWidth='lg' >
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
