import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
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
        <FormControl isInvalid={errors.name ? true : false}>
          <Input
            id="prompt"
            backgroundColor="white"
            color="black"
            type="text"
            autoFocus
            placeholder="crayon drawing of several cute colorful monsters with ice cream cone bodies on dark blue paper"
            _placeholder={{ opacity: 0.4, color: "black" }}
            w="3xl"
            size="md"
            {...register("prompt", {
              required: "This is required",
            })}
          />

          {errors?.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button
          alignSelf="center"
          justifySelf="center"
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
}
