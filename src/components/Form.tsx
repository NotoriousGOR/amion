import type { SubmitHandler } from "react-hook-form";
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

import { useGenerateImage } from "../hooks/useGenerateImage";
import { useStore } from "../stores/user";

type FormValues = {
  prompt: string;
  size: string;
};

export default function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { addImage } = useStore();

  const GenerateImage: SubmitHandler<FormValues> = async (values) => {
    const generated = await useGenerateImage(values.prompt, values.size);
    if (generated) {
      generated.data.map((image) => {
        if (image.url) addImage(image.url, values.prompt);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(GenerateImage)}>
      <Flex direction="row" align="center" justify="center">
        <FormControl marginRight="10" isInvalid={errors.size ? true : false}>
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
            defaultValue="small"
            {...register("size", {
              required: "This is required",
            })}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Select>
        </FormControl>
        <FormControl isInvalid={errors.prompt ? true : false}>
          <Flex direction="row" align="center" justify="space-between">
            <FormLabel color="white" opacity={0.4}>
              Description
            </FormLabel>
            {(errors?.prompt || errors.size) && (
              <>
                {errors.prompt && !errors.size ? (
                  <FormErrorMessage>{errors.prompt?.message}</FormErrorMessage>
                ) : (
                  <FormErrorMessage>{errors.size?.message}</FormErrorMessage>
                )}
              </>
            )}
          </Flex>
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
        </FormControl>
      </Flex>
    </form>
  );
}
