import { signIn, signOut, useSession } from "next-auth/react";

import {
  Avatar,
  ButtonGroup,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/react";

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
        <>
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
        </>
      ) : (
        <>
          <ButtonGroup gap="2">
            <Avatar
              onClick={() => signIn()}
              colorScheme="facebook"
              color="white"
            ></Avatar>
          </ButtonGroup>
        </>
      )}
    </Flex>
  );
}
