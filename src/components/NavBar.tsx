import { signIn, signOut, useSession } from "next-auth/react";

import {
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  MenuDivider,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/react";

export default function NavBar() {
  const { data: sessionData } = useSession();

  return (
    <Flex minWidth="max-content" flexDirection="row-reverse" alignItems="center" gap="3" marginX={30} marginY={30}>
      {sessionData ? (
        <>
          <Menu>
            <MenuButton as={Button} colorScheme="teal">
              Profile
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem>My Account</MenuItem>
                <MenuItem>Payments </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem>Docs</MenuItem>
                <MenuItem>FAQ</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <ButtonGroup gap="2">
            <Button onClick={() => signIn()} colorScheme="facebook" color="white">
              Log in
            </Button>
          </ButtonGroup>
        </>
      )}
    </Flex>
  );
}
