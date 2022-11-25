import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { LoginForm } from './components/LoginForm';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<LoginForm username={''} password={''} />} />
          <Route path={'/register'} element={<h1>Register</h1>} />
          <Route path={'/room'} />
          <Route path="*" element={<h1>Erreur 404</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
