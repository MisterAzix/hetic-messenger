import Head from 'next/head'
import css from './Home.module.scss'

export default function Page() {
  return (
    <div className={css.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/front/public/favicon.ico"/>
      </Head>

      <main className={css.main}>
        <h1 className={css.title}>
          Welcome to <a href="https://nextjs.org">Hetic Messenger!</a>
        </h1>
      </main>
    </div>
  )
}
