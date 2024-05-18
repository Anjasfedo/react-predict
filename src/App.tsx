import { Switch } from "@chakra-ui/react";
import useAuthStore from "@stores/authStore";
import { useEffect } from "react";
import { BrowserRouter, Route, Navigate } from "react-router-dom";
import Login from "@src/components/Login";
import Register from "@src/components/Register";
import Dashboard from "@src/components/Dashboard";
import Home from "@src/components/Home";

function App() {
  const initialAuthListener = useAuthStore(
    (state) => state.iniinitializeAuthListener
  );

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    initialAuthListener();
    return () => {};
  }, [initialAuthListener]);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/dashboard">
            {user ? <Dashboard /> : <Navigate to="/login" />}
          </Route>
          <Route path="/" Component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
