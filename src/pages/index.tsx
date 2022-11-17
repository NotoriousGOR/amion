import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import NavBar from "../components/NavBar";


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>AVI</title>
        <meta
          name="description"
          content="UI to generate Images from the Open API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <NavBar/>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div>
      <p>
        {sessionData && <span>Logged in as {sessionData?.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
