import React, { useEffect, useState } from "react";
import { getItems } from "../services/api";
import { Link } from "react-router-dom";

const ItemList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems().then((res) => {
      setItems(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Lade Items...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <ul>
        {items.map((i) => (
          <li key={i.id} className="mb-2">
            <Link
              to={`/items/${i.id}`}
              className="text-blue-600 hover:underline"
            >
              {i.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
