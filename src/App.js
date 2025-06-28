// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import FamilyTreePage from "./pages/FamilyTreePage";
import CreateFamilyPage from "./pages/CreateFamilyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      {isLoggedIn && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-family" element={<CreateFamilyPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/family-tree"
          element={
            <ProtectedRoute>
              <FamilyTreePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}


export default App;
