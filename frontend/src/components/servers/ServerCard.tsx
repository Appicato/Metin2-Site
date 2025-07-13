import React from "react";

const ServerCard: React.FC<{
  server: { id: number; name: string; description?: string };
}> = ({ server }) => (
  <div className="border p-4 rounded shadow hover:shadow-lg transition">
    <h2 className="text-xl font-semibold">{server.name}</h2>
    {server.description && (
      <p className="mt-2 text-gray-600">{server.description}</p>
    )}
  </div>
);

export default ServerCard;
