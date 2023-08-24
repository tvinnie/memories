import React from 'react';
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  return (
    <GoogleOAuthProvider clientId='GOOGLE_CLIENT_ID '>
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
