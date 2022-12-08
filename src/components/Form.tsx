import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Flex,
  Input,
  InputGroup,
  Button,
  Select,
  FormLabel,
  InputRightElement,
} from "@chakra-ui/react";
import { generateImage } from "../hooks/generateImage";

type FormValues = {
  prompt: string;
  size: string;
};

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const generate = (values: unknown) => {
    const { size, prompt } = values;

    generateImage(size, prompt);
  };

  return (
    <form onSubmit={handleSubmit(generate)}>
      <Flex direction="row" align="center" justify="center">
        <FormControl marginRight="10">
          <FormLabel color="white" opacity={0.4}>
            Size
          </FormLabel>
          <Select
            id="size"
            placeholder="Select Size"
            backgroundColor="white"
            color="black"
            fontSize="xl"
            w="xxs"
            defaultValue="medium"
            {...register("size", {
              required: "This is required",
            })}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Select>
        </FormControl>
        <FormControl isInvalid={errors.name ? true : false}>
          <FormLabel color="white" opacity={0.4}>
            Description
          </FormLabel>
          <InputGroup>
            <Input
              id="prompt"
              backgroundColor="white"
              color="black"
              type="text"
              fontSize="xl"
              autoFocus
              placeholder="crayon drawing of several cute colorful monsters with ice cream cone bodies on dark blue paper"
              _placeholder={{ opacity: 0.4, color: "black" }}
              w="4xl"
              {...register("prompt", {
                required: "This is required",
              })}
            />
            <InputRightElement width="4.5rem">
              <Button
                colorScheme="linkedin"
                isLoading={isSubmitting}
                type="submit"
                borderRadius="none"
              >
                Submit
              </Button>
            </InputRightElement>
          </InputGroup>

          {errors?.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>
      </Flex>
    </form>
  );
}
