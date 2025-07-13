import React, { useEffect, useState } from "react";
import { getItemsByServer, getServers } from "../services/api";
import placeholder from "../../assets/placeholder.jpg";

interface Server {
  id: number;
  name: string;
}

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

const ItemList: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Server-Liste laden
    getServers()
      .then((res) => {
        setServers(res.data);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Server:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedServerId !== null) {
      setLoading(true);
      getItemsByServer(selectedServerId)
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedServerId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-400 mb-10 text-center">
          Unsere Items
        </h1>

        {/* Server-Auswahl */}
        <div className="mb-6 flex justify-center">
          <select
            value={selectedServerId ?? ""}
            onChange={(e) =>
              setSelectedServerId(
                e.target.value ? parseInt(e.target.value) : null
              )
            }
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

        {!loading && items.length === 0 && selectedServerId && (
          <p className="text-center text-gray-400">
            Keine Items für diesen Server gefunden.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
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
                    {item.description || "Keine Beschreibung vorhanden."}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
