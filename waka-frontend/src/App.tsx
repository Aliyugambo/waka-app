import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoadingScreen from "./components/landingpage/LoadingScreen";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import PlaceDetail from "./components/homepage/PlaceDetail";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g., fetch config, check auth, etc.)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/places/:id" element={<PlaceDetail />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;