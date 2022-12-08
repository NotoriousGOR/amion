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

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    console.log(values);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            size="md"
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
              autoFocus
              placeholder="crayon drawing of several cute colorful monsters with ice cream cone bodies on dark blue paper"
              _placeholder={{ opacity: 0.4, color: "black" }}
              w="4xl"
              size="md"
              {...register("prompt", {
                required: "This is required",
              })}
            />
            <InputRightElement width="4.5rem">
              <Button
                size="md"
                colorScheme="teal"
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
