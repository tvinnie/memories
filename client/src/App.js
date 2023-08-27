import React from 'react';
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  return (
    <GoogleOAuthProvider clientId='944678440733-t2edetun0nmqvvh143q84e5uhpt0e7np.apps.googleusercontent.com'>
    <BrowserRouter>
      <Container maxWidth='lg' >
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
