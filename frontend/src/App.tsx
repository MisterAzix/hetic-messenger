import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { NeedAuth } from './components/NeedAuth';
import { Home } from './features/Home/Home';
import { LoginForm } from './features/Login/LoginForm';
import { RegisterForm } from './features/Register/RegisterForm';
import { Room } from './features/Room/Room';
import { Chat } from './features/Chat/Chat';

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
