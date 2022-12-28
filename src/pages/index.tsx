import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import {
  Button,
  Flex,
  Stack,
  Text,
  Heading,
  Highlight,
  Container,
} from "@chakra-ui/react";

import HookForm from "../components/Form";
import NavBar from "../components/NavBar";
import ImageList from "../components/ImageList";
import { useStore } from "../stores/user";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { addImage } = useStore();

  if(sessionData?.user) {
    const images =  trpc.images.list.useQuery({
      limit: 20,
      userId: sessionData.user.id ?? "",
    }).data?.items;

    images?.map(image => addImage())
  }

  return (
    <>
      <Head>
        <title>Amion</title>
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
              <HookForm />
              <Container marginTop="16" maxW="5xl">
                <ImageList />
              </Container>
            </Stack>
          ) : (
            <Stack marginBottom="10" textAlign="center">
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="bold"
              >
                Welcome to Amion
              </Text>
              <Text fontSize="3xl" marginBottom="0">
                Another Text-To-Art Generator
              </Text>
              <Heading fontSize="3xl" paddingTop="12">
                <Button fontSize="inherit" padding="1" colorScheme="transparent" onClick={() => signIn()}>
                  <Highlight
                    query="Sign In"
                    styles={{
                      px: "2",
                      py: "1",
                      rounded: "full",
                      bg: "red.100",
                    }}
                  >
                    Sign In
                  </Highlight>
                </Button>
                to generate images from text
              </Heading>
            </Stack>
          )}
        </Flex>
      </main>
    </>
  );
};

export default Home;
