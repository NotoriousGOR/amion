import { List, ListItem, Image } from "@chakra-ui/react";
import { useStore } from "../stores/user";

export default function ImageList() {
  const { images } = useStore();
  return (
    <List>
      {images?.map((image, index) => {
        return (
          <ListItem key={index}>
            <Image src={image.url} alt={image.prompt}></Image>
          </ListItem>
        );
      })}
    </List>
  );
}
