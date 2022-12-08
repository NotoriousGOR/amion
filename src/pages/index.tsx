import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Flex, Stack, Text } from "@chakra-ui/react";

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
            <Stack marginBottom="10" textAlign="center">
              <Text fontSize="6xl" fontWeight="bold">
                {/* this gets the first name since Google puts first and last in one field */}
                Welcome back, {sessionData.user?.name?.split(" ")[0]}
              </Text>
            </Stack>
          ) : (
            <Stack marginBottom="10" textAlign="center">
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="bold"
              >
                Welcome to AVI
              </Text>
              <Text fontSize="3xl" marginBottom="0">
                Another Text-To-Art Generator
              </Text>
              <Text fontSize="sm">(Until I run out of credits) 😅</Text>
            </Stack>
          )}
          <HookForm />
        </Flex>
      </main>
    </>
  );
};

export default Home;
