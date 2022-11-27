import { NavLink } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <h1>
        Welcome to <NavLink to={'/login'}>HETIC Messenger!</NavLink>
      </h1>
    </div>
  );
}
