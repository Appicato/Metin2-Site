import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import ServerList from "./components/servers/ServerList";
import ItemsByServer from "./components/items/ItemsByServer";
import ItemPage from "./components/pages/ItemPage";
import AddItem from "./items/AddItem";
import RegistrationForm from "./components/pages/RegistrationForm";
import LoginForm from "./components/pages/LoginForm";
import ProfilePage from "./components/pages/ProfilePage";
import PrivateRoute from "./components/common/PrivateRoute";
import { AuthProvider } from "./components/context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/register" element={<RegistrationForm />} />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/servers" element={<ServerList />} />
              <Route path="/items/add" element={<AddItem />} />{" "}
              {/* Neue Route */}
              <Route
                path="/items/server/:serverId"
                element={<ItemsByServer />}
              />
              <Route path="/items/:itemId" element={<ItemPage />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
