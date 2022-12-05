import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Flex, Text } from "@chakra-ui/react";

import HookForm from "../components/Form";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

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
        <NavBar />
        <Flex direction="column" justify="center" align="center">
          {sessionData ? (
            <>Hello {sessionData.user?.name}</>
          ) : (
            <>
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >
                Welcome to Avi
              </Text>
              <Text fontSize="3xl" marginBottom="0">
                Another Text-To-Art Generator
              </Text>
              <Text fontSize="sm">(Until I run out of credits) 😅</Text>
            </>
          )}
        </Flex>
        <HookForm />
      </main>
    </>
  );
};

export default Home;
