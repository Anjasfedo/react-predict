import { auth } from "@configs/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@stores/authStore";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Heading,
} from "@chakra-ui/react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof schema>;

const Login: React.FC = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password }: LoginFormInputs) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });

      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-not-found"
      ) {
        setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else if (error.code === "auth/wrong-password") {
        setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else if (error.code === "auth/invalid-credential") {
        setError("email", { type: "manual", message: "Invalid credentials" });
        setError("password", {
          type: "manual",
          message: "Invalid credentials",
        });
      }
      console.error(error.message);
    }
  };

    const handleGoogleLogin = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);

        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });

        navigate("/dashboard");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Google login error:", error.message);
      }
    };

  return (
    <div className="flex flex-col items-center">
      <Heading as="h2" size="md" mb={4}>
        Login
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
        <Button type="submit" colorScheme="blue" mt={4}>
          Login
        </Button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
      <Button onClick={handleGoogleLogin} colorScheme="green" mt={4}>
        Google
      </Button>
    </div>
  );
};

export default Login;
