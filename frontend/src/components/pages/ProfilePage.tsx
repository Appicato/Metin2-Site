// src/components/pages/ProfilePage.tsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiUser, FiMail, FiHash, FiLogOut } from "react-icons/fi";

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

const ProfilePage = () => {
  const { token, logout } = useContext(AuthContext); // Falls logout in Context
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.detail || "Fehler beim Laden des Profils.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setProfile(data);
        setLoading(false);
      } catch (e) {
        setError("Netzwerkfehler.");
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (loading)
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-gray-900 rounded-xl shadow-lg text-gray-300 animate-pulse">
        <div className="h-6 mb-6 bg-gray-700 rounded w-3/5"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-red-900 rounded-lg shadow-lg text-red-400 text-center">
        {error}
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gray-900 rounded-xl shadow-lg text-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center tracking-wide">
        Mein Profil
      </h2>

      <div className="flex flex-col items-center space-y-6">
        {/* Avatar Platzhalter */}
        <div className="w-28 h-28 bg-gradient-to-tr from-teal-400 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white select-none">
          {profile?.username.charAt(0).toUpperCase()}
        </div>

        <div className="w-full space-y-5">
          <div className="flex items-center space-x-3 text-gray-300">
            <FiHash className="text-teal-400 w-6 h-6" />
            <span className="font-semibold min-w-[110px]">ID:</span>
            <span className="text-lg">{profile?.id}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-300">
            <FiUser className="text-teal-400 w-6 h-6" />
            <span className="font-semibold min-w-[110px]">Benutzername:</span>
            <span className="text-lg">{profile?.username}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-300">
            <FiMail className="text-teal-400 w-6 h-6" />
            <span className="font-semibold min-w-[110px]">Email:</span>
            <span className="text-lg break-words">{profile?.email}</span>
          </div>
        </div>

        {/* Optional: Logout Button */}
        {logout && (
          <button
            onClick={logout}
            className="mt-8 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors rounded-lg py-3 font-semibold flex items-center justify-center space-x-2"
            aria-label="Logout"
            type="button"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Abmelden</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
