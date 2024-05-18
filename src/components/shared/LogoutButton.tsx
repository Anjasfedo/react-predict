import { Button } from "@chakra-ui/react";
import { auth } from "@configs/firebase";
import useAuthStore from "@stores/authStore";

const LogoutButton = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Clear user from state
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
