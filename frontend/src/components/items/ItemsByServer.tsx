// src/components/items/ItemsByServer.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import placeholder from "../../assets/placeholder.jpg";

interface Price {
  id: number;
  price: number;
  currency: string;
  trust_level: number;
  server_id: number | null;
  item_id: number;
  created_at: string;
}

interface Item {
  id: number;
  name: string;
  description?: string;
  icon_url?: string | null;
  prices: Price[];
}

interface Server {
  id: number;
  name: string;
}

const ItemsByServer: React.FC = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const navigate = useNavigate();

  const [servers, setServers] = useState<Server[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Serverliste laden für Dropdown
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/servers/")
      .then((res) => setServers(res.data))
      .catch(() => setError("Fehler beim Laden der Server"));
  }, []);

  // Items laden, wenn serverId vorhanden
  useEffect(() => {
    if (!serverId) return;
    setLoading(true);
    setError(null);

    axios
      .get(`http://127.0.0.1:8000/api/v1/items/by-server/${serverId}`)
      .then((res) => setItems(res.data))
      .catch(() => setError("Fehler beim Laden der Items"))
      .finally(() => setLoading(false));
  }, [serverId]);

  // Servername anhand der serverId ermitteln
  const currentServerName = servers.find(
    (s) => s.id === Number(serverId)
  )?.name;

  // Handler für Serverwechsel über Dropdown
  const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newServerId = e.target.value;
    if (newServerId) {
      navigate(`/items/server/${newServerId}`);
    } else {
      navigate("/servers"); // Optional: zurück zur Serverliste wenn nichts ausgewählt
    }
  };

  if (error)
    return (
      <div className="text-center text-red-500 mt-10 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-400 mb-10 text-center">
          Items auf Server{" "}
          <span className="text-cyan-400">{currentServerName ?? serverId}</span>
        </h1>

        {/* Server-Auswahl Dropdown */}
        <div className="mb-6 flex justify-center">
          <select
            value={serverId ?? ""}
            onChange={handleServerChange}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="">Server wählen...</option>
            {servers.map((server) => (
              <option key={server.id} value={server.id}>
                {server.name}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="text-center text-gray-300">Lade Items...</p>}

        {!loading && items.length === 0 && (
          <p className="text-center text-gray-400">
            Keine Items für diesen Server gefunden.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              to={`/items/${item.id}`}
              key={item.id}
              className="bg-gray-800 bg-opacity-80 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              <img
                src={item.icon_url || placeholder}
                alt={item.name}
                className="w-full h-36 object-contain rounded-t-lg bg-gray-900 p-2"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-cyan-300 mb-1 truncate">
                  {item.name}
                </h2>
                {item.description && (
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    <span className="text-gray-400">Beschreibung:</span>{" "}
                    {item.description ||
                      "Keine Beschreibung vorhanden."}
                  </p>
                )}

                {item.prices.length > 0 ? (
                  <div className="space-y-1 text-gray-300 text-sm">
                    <p>
                      <span className="text-gray-400">Preis:</span>{" "}
                      <span className="font-semibold text-white">
                        {item.prices[0].price.toLocaleString()}{" "}
                        {item.prices[0].currency}
                      </span>
                    </p>
                    {item.prices[0].trust_level !== null && (
                      <p>
                        <span className="text-gray-400">Trust Level:</span>{" "}
                        <span className="text-green-400">
                          {item.prices[0].trust_level}
                        </span>
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    Noch keine Preise verfügbar.
                  </p>
                )}

                <div className="mt-4">
                  <button className="w-full py-2 text-center rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition duration-200 text-sm">
                    Details ansehen
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsByServer;
