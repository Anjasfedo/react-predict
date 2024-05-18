import useAuthStore from "@stores/authStore";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@src/components/Login";
import Register from "@src/components/Register";
import Dashboard from "@src/components/Dashboard";
import Home from "@src/components/Home";

function App() {
  const initialAuthListener = useAuthStore(
    (state) => state.initializeAuthListener
  );

  useEffect(() => {
    const unsubscribe = initialAuthListener();
    return () => {
      unsubscribe(); // Call the unsubscribe function
    };
  }, [initialAuthListener]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/" Component={Home} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
