import useAuthStore from "@stores/authStore";
import { useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Login from "@src/components/Login";
import Register from "@src/components/Register";
import Dashboard from "@src/components/Dashboard";
import Home from "@src/components/Home";

function App() {
  const initialAuthListener = useAuthStore(
    (state) => state.initializeAuthListener
  );

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const unsubscribe = initialAuthListener();
    return () => {
      unsubscribe(); // Call the unsubscribe function
    };
  }, [initialAuthListener]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between max-w-5xl mx-auto relative">
      <BrowserRouter>
        <div className="flex">
          <nav>
            <ul className="flex space-x-2">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <p className="absolute right-0">User: {user ? user.email : "Not signed in"}</p>
        </div>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/" Component={Home} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
