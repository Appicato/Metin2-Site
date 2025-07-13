import React, { useState } from "react";
import { createPrice } from "../services/api";

interface PriceFormProps {
  itemId: number;
  onPriceAdded: (newPrice: any) => void;
}

const PriceForm: React.FC<PriceFormProps> = ({ itemId, onPriceAdded }) => {
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("yang");
  const [trustLevel, setTrustLevel] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!price || isNaN(Number(price))) {
      setError("Bitte einen gültigen Preis eingeben.");
      return;
    }

    try {
      setLoading(true);
      const res = await createPrice(itemId, {
        price: parseFloat(price),
        currency,
        trust_level: trustLevel,
      });
      onPriceAdded(res.data);
      setPrice("");
      setTrustLevel(1);
    } catch {
      setError("Fehler beim Speichern des Preises.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-8"
    >
      <h3 className="text-2xl font-bold text-teal-400 mb-6 text-center">
        Preis hinzufügen
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-300 mb-1">Preis</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Währung</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={loading}
          >
            <option value="yang">Yang</option>
            <option value="won">Won</option>
            <option value="euro">Euro</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Trust Level</label>
          <select
            value={trustLevel}
            onChange={(e) => setTrustLevel(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={loading}
          >
            <option value={1}>1 - Niedrig</option>
            <option value={2}>2 - Mittel</option>
            <option value={3}>3 - Hoch</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="text-red-500 mt-4 text-center font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded font-semibold transition duration-200"
      >
        {loading ? "Speichern..." : "Preis speichern"}
      </button>
    </form>
  );
};

export default PriceForm;
