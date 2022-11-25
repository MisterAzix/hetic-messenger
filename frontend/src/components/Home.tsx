import { NavLink } from 'react-router-dom';

export default function Page() {
  return (
    <div>
      <h1>
        Welcome to <NavLink to={'/login'}>HETIC Messenger!</NavLink>
      </h1>
    </div>
  );
}
