import useAuthStore from "@stores/authStore";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Login from "@src/components/Login";
import Register from "@src/components/Register";
import Dashboard from "@src/components/Dashboard";
import Home from "@src/components/Home";
import LogoutButton from "@src/components/shared/LogoutButton";

import { Center, Spinner, Switch, useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const initialAuthListener = useAuthStore(
    (state) => state.initializeAuthListener
  );

  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const unsubscribe = initialAuthListener();
    // Simulate loading with a timeout
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed
    return () => {
      unsubscribe(); // Call the unsubscribe function
    };
  }, [initialAuthListener]);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center relative space-y-5 max-w-5xl mx-auto py-2 font-semibold">
      <BrowserRouter>
        <nav>
          <div className="flex space-x-2 items-center">
            <Switch
              className="absolute left-0"
              size="md"
              onChange={toggleColorMode}
            />
            <Link to="/">Home</Link>
            {!user && (
              // Show the Login and Register links only if there is no user
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            {user && <Link to="/dashboard">Dashboard</Link>}
          </div>
        </nav>
        {user && (
          // Show the Logout button if there is a user
          <div className="absolute right-0 flex flex-col">
            <p className="">User: {user.email}</p>
            <LogoutButton />
          </div>
        )}
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
