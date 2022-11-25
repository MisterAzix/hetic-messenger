import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <div className="App">
              <h1>Home</h1>
            </div>
          }
        />
        <Route
          path={'/login'}
          element={
            <div className="App">
              <h1>Login</h1>
            </div>
          }
        />
        <Route
          path={'/register'}
          element={
            <div className="App">
              <h1>Register</h1>
            </div>
          }
        />
        <Route path="*" element={<h1>Erreur 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
