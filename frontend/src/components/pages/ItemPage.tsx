import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById, getPricesByItem } from "../services/api";
import ItemDetail from "../items/ItemDetail";
import PriceForm from "../prices/PriceForm";

const ItemPage = () => {
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<any>(null);
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId) return;

    const id = parseInt(itemId, 10);
    if (isNaN(id)) {
      setError("Ungültige Item ID");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const itemRes = await getItemById(id);
        const pricesRes = await getPricesByItem(id);
        setItem(itemRes.data);
        setPrices(pricesRes.data);
      } catch (err) {
        setError("Fehler beim Laden der Daten.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [itemId]);

  const handlePriceAdded = (newPrice: any) => {
    setPrices((prev) => [...prev, newPrice]);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
        Lädt Daten…
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-red-500 font-semibold">
        {error}
      </div>
    );

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-400">
        Item nicht gefunden.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <ItemDetail item={item} prices={prices} />
      <div className="max-w-5xl mx-auto mt-8">
        <PriceForm
          itemId={parseInt(itemId ?? "", 10)}
          onPriceAdded={handlePriceAdded}
        />
      </div>
    </div>
  );
};

export default ItemPage;
