import css from './Home.module.scss';
import Link from 'next/link';

export default function Page() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Welcome to <Link href={'/login'}>HETIC Messenger!</Link>
      </h1>
    </div>
  );
}
