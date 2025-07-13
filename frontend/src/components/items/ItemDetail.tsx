import React from "react";

interface Price {
  id: number;
  price: number;
  currency: string;
  user_id?: number;
  server_id?: number | null;
  trust_level: number;
  created_at: string;
}

interface Item {
  id: number;
  name: string;
  description?: string;
}

interface ItemDetailProps {
  item: Item;
  prices?: Price[];
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, prices = [] }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-gray-800 bg-opacity-80 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-cyan-300 mb-4 text-center">
          {item.name}
        </h1>

        {item.description && (
          <p className="text-gray-300 text-lg mb-8 text-center max-w-3xl mx-auto">
            {item.description}
          </p>
        )}

        <h2 className="text-2xl font-bold text-teal-400 mb-6 text-center">
          Preise
        </h2>

        {prices.length === 0 ? (
          <p className="text-gray-400 text-center italic">
            Keine Preise verfügbar.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="p-3 text-left">Preis</th>
                  <th className="p-3 text-left">Währung</th>
                  <th className="p-3 text-left">Server ID</th>
                  <th className="p-3 text-left">Vertrauenslevel</th>
                  <th className="p-3 text-left">Datum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {prices.map((price) => (
                  <tr
                    key={price.id}
                    className="hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-3 text-cyan-300 font-semibold">
                      {price.price.toLocaleString()}
                    </td>
                    <td className="p-3 text-gray-300">{price.currency}</td>
                    <td className="p-3 text-gray-300">
                      {price.server_id ?? "-"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          price.trust_level >= 3
                            ? "bg-green-600 text-white"
                            : price.trust_level === 2
                            ? "bg-yellow-500 text-black"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {price.trust_level}
                      </span>
                    </td>
                    <td className="p-3 text-gray-400">
                      {new Date(price.created_at).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
