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
      <Flex direction="row" align="center">
        <FormControl isInvalid={errors?.name ? errors?.name : false}>
          <Input
            id="prompt"
            backgroundColor="white"
            marginTop="10"
            placeholder="crayon drawing of several cute colorful monsters with ice cream cone bodies on dark blue paper"
            _placeholder={{ opacity: 0.4, color: "black" }}
            maxW="4xl"
            size="md"
            {...register("prompt", {
              required: "This is required",
            })}
          />
          {errors?.name && errors?.name?.message && (
            <FormErrorMessage>
              {errors?.name && errors?.name?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          mt={4}
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
