import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './components/Home';
import { LoginForm } from './components/LoginForm';
import { NeedAuth } from './components/NeedAuth';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<LoginForm />} />
          <Route path={'/register'} element={<h1>Register</h1>} />
          <Route
            path={'/room'}
            element={
              <NeedAuth>
                <h1>Room</h1>
              </NeedAuth>
            }
          />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
