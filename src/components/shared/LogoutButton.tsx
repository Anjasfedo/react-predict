import { Button } from "@chakra-ui/react";
import { auth } from "@configs/firebase";
import useAuthStore from "@stores/authStore";
import useJwtStore from "@stores/jwtStore";

const LogoutButton = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearToken = useJwtStore((state) => state.clearToken);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Clear user from state
      clearToken();

      // Optionally, you can navigate to a different page after logout
      // Example: navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button onClick={handleLogout} colorScheme="blue">
      Logout
    </Button>
  );
};

export default LogoutButton;
