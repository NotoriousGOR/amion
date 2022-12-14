import { Flex, List, ListItem, Image } from "@chakra-ui/react";
import { useStore } from "../stores/user";

export default function ImageList() {
  const { images } = useStore();
  return (
    <List marginTop="16">
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        wrap="wrap"
        justify="space-evenly"
      >
        {images?.map((image, index) => {
          return (
            <ListItem key={index} marginY="4">
              <Image src={image.url} alt={image.prompt}></Image>
            </ListItem>
          );
        })}
      </Flex>
    </List>
  );
}
