import { Button } from "@chakra-ui/react";
import useBearStore from "@stores/bearStore";
import useAuthStore from "@stores/authStore";

const Home = () => {
  const bear = useBearStore((state) => state.bears);
  const incraise = useBearStore((state) => state.increase);
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h1>Home</h1>
      <p>Bear count: {bear}</p>
      <p>User: {user ? user.email : "Not signed in"}</p>
      <Button onClick={incraise}>Add Bears</Button>
    </div>
  );
};

export default Home;
