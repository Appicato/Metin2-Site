// src/components/items/AddItem.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Server {
  id: number;
  name: string;
}

const AddItem = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [priceAmount, setPriceAmount] = useState<number>(0);
  const [priceCurrency, setPriceCurrency] = useState<string>("Yang");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/servers/")
      .then((res) => {
        setServers(res.data);
        if (res.data.length > 0) setSelectedServerId(res.data[0].id);
      })
      .catch(() => {
        setError("Serverliste konnte nicht geladen werden.");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServerId) {
      setError("Bitte einen Server auswählen.");
      return;
    }

    if (priceAmount <= 0) {
      setError("Bitte einen gültigen Preis angeben.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("http://127.0.0.1:8000/api/v1/items/", {
        name,
        description,
        icon_url: iconUrl,
        server_id: selectedServerId,
        price: {
          amount: priceAmount,
          currency: priceCurrency,
        },
      });

      setSuccess(true);
      setName("");
      setDescription("");
      setIconUrl("");
      setPriceAmount(0);
      setPriceCurrency("Yang");
    } catch (err) {
      console.error(err);
      setError("Fehler beim Anlegen des Items.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Neues Item hinzufügen</h2>

      {error && <div className="bg-red-600 p-2 mb-4 rounded">{error}</div>}
      {success && (
        <div className="bg-green-600 p-2 mb-4 rounded">
          Item erfolgreich angelegt!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Server auswählen:
          <select
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={selectedServerId ?? ""}
            onChange={(e) => setSelectedServerId(Number(e.target.value))}
            required
          >
            {servers.map((server) => (
              <option key={server.id} value={server.id}>
                {server.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Name:
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="block">
          Beschreibung:
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="block">
          Icon URL:
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
          />
        </label>

        <label className="block">
          Preis (Betrag):
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={priceAmount}
            onChange={(e) => setPriceAmount(Math.floor(Number(e.target.value)))}
            required
            min={0}
          />
        </label>

        <label className="block">
          Währung:
          <select
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={priceCurrency}
            onChange={(e) => setPriceCurrency(e.target.value)}
          >
            <option value="Yang">Yang</option>
            <option value="Won">Won</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 p-2 rounded font-bold"
        >
          {loading ? "Speichert..." : "Item hinzufügen"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
