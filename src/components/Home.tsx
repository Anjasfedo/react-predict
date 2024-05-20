import { Button } from "@chakra-ui/react";
import useBearStore from "@stores/bearStore";
import useAuthStore from "@stores/authStore";

import { testEnv } from "@libs/fetchApi";
import useJwtStore from "@stores/jwtStore";

const Home = () => {
  const bear = useBearStore((state) => state.bears);
  // const incraise = useBearStore((state) => state.increase);
  const token = useJwtStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h1>Home</h1>
      <p>Bear count: {bear}</p>
      {token}
      <p>User: {user ? user.email : "Not signed in"}</p>
      <Button onClick={testEnv}>Add Bears</Button>
    </div>
  );
};

export default Home;
