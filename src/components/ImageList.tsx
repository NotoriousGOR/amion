import { Flex, List, ListItem, chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useStore } from "../stores/user";

export default function ImageList() {
  const Image = chakra(motion.img);

  const { images } = useStore();
  return (
    <List>
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        wrap="wrap"
        justify="space-evenly"
      >
        {images?.map((image, index) => {
          return (
            <ListItem key={index} marginY="4">
              <Image
                src={image.url}
                alt={image.prompt}
                whileHover={{
                    scale:1.2
                }}
              ></Image>
            </ListItem>
          );
        })}
      </Flex>
    </List>
  );
}
