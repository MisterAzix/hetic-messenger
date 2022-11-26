import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './components/Home';
import { LoginForm } from './components/LoginForm';
import { NeedAuth } from './components/NeedAuth';
import { RegisterForm } from './components/RegisterForm';
import Room from './components/Room/Room';
import Chat from './components/Room/Chat';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'login'} element={<LoginForm />} />
          <Route path={'register'} element={<RegisterForm />} />
          <Route
            path={'room'}
            element={
              <NeedAuth>
                <Room />
              </NeedAuth>
            }
          >
            <Route path=":userId" element={<Chat />} />
          </Route>
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
