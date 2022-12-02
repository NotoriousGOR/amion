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