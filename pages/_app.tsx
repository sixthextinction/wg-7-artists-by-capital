import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <main className="bg-blue-200 dark:bg-slate-900 min-h-screen min-w-screen">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default MyApp;
