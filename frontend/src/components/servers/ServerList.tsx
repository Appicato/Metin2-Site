// src/components/servers/ServerList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Server {
  id: number;
  name: string;
}

const ServerList: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/servers/")
      .then((res) => {
        setServers(res.data);
      })
      .catch(() => setError("Fehler beim Laden der Server"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-300 mt-10 font-semibold">
        Lade Server...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 mt-10 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-400 mb-10 text-center">
          Server auswählen
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {servers.map((server) => (
            <Link
              key={server.id}
              to={`/items/server/${server.id}`}
              className="block bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-[1.03]"
            >
              <h2 className="text-xl font-semibold text-cyan-400 text-center">
                {server.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerList;
