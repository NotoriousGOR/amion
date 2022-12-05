import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import NavBar from "../components/NavBar";
import {
  Flex,
  Text,
  Input,
  IconButton,
  Icon,
  FormControl,
} from "@chakra-ui/react";

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

          <Input
            isRequired={true}
            backgroundColor="white"
            marginTop="10"
            placeholder="crayon drawing of several cute colorful monsters with ice cream cone bodies on dark blue paper"
            _placeholder={{ opacity: 0.4, color: "black" }}
            maxW="4xl"
            size="md"
            autoFocus={true}
            name="prompt"
          />
        </Flex>
      </main>
    </>
  );
};

export default Home;
