import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@stores/authStore";
import { auth } from "@configs/firebase";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Heading,
} from "@chakra-ui/react";
import { postDataGetToken } from "@libs/fetchApi";

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof schema>;

const Register: React.FC = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password }: RegisterFormInputs) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await postDataGetToken(
        { uid: userCredential.user.uid },
        "/v1/auths/token/"
      );

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });

      navigate("/dashboard");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Heading as="h2" size="md" mb={4}>
        Register
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.confirmPassword} mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" {...register("confirmPassword")} />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
