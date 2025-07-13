// src/components/pages/RegistrationForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
  });
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
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "Fehler bei der Registrierung.");
        setLoading(false);
        return;
      }

      // Erfolgreich registriert - weiter zum Login
      setLoading(false);
      navigate("/auth/login");
    } catch (err) {
      setError("Netzwerkfehler.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Registrieren</h2>
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
          type="email"
          name="email"
          placeholder="E-Mail"
          value={form.email}
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
          minLength={6}
          className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Registrieren..." : "Registrieren"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
