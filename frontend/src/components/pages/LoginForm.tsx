// src/components/pages/LoginForm.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("username", form.username);
      params.append("password", form.password);

      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "Fehler beim Login.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setToken(data.access_token);
      setLoading(false);
      navigate("/profile");
    } catch {
      setError("Netzwerkfehler.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Login..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
