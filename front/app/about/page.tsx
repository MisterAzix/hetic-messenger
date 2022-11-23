import Head from 'next/head';
import css from '../Home.module.scss';

export default function Page() {
  return (
    <div className={css.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/front/public/favicon.ico" />
      </Head>

      <main className={css.main}>
        <h1>Bienvenue sur la page about</h1>
      </main>
    </div>
  );
}
