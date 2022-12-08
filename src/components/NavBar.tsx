import { signIn, signOut, useSession } from "next-auth/react";

import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import { RepeatClockIcon } from "@chakra-ui/icons";

export default function NavBar() {
  const { data: sessionData } = useSession();

  const image = sessionData?.user?.image ? sessionData.user?.image : "";

  return (
    <Flex
      minWidth="max-content"
      flexDirection="row-reverse"
      alignItems="center"
      gap="3"
      marginX={30}
      marginY={30}
    >
      {sessionData ? (
        <Flex direction="column" align="center" justify="center">
          <Menu>
            <MenuButton>
              <Avatar
                name={`${sessionData.user?.name}`}
                src={image}
                colorScheme="facebook"
                color="white"
                referrerPolicy="no-referrer"
              />
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem>My Account</MenuItem>
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
          <IconButton marginTop="3" backgroundColor="transparent" aria-label="History" icon={ <RepeatClockIcon w={6} h={6} /> } />
        </Flex>
      ) : (
        <Avatar
          onClick={() => signIn()}
          colorScheme="facebook"
          color="white"
        ></Avatar>
      )}
    </Flex>
  );
}
